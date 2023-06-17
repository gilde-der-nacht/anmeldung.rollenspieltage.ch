import { headerJSON } from '$lib/shared/common';
import { get, type Readable, type Writable } from 'svelte/store';
import { serverDataSchema } from '$lib/shared/schema/server';
import _ from 'lodash';
import { saveSchema, type SaveSchema } from '$lib/shared/schema/complex/saveSchema';
import type { AppState } from '$lib/shared/schema/app';
import { z } from 'zod';
import type { Progress } from './schema/enums';
import { validateState } from './validation';

type SuccessfullSave = {
	success: true;
	id: string;
};

type FailedSave = {
	success: false;
};

export type SaveState =
	| 'WAITING'
	| 'DEBOUNCING'
	| 'DIFFING_LIVE_STATE'
	| 'ABORTING'
	| 'FETCHING_LAST_SAVE'
	| 'DIFFING_LAST_SAVE'
	| 'NO_NEW_STATE'
	| 'SAVING'
	| 'SAVED'
	| 'ERROR';

export async function save(
	newState: AppState,
	lastState: Readable<AppState>,
	eventListener?: (saveState: SaveState) => Promise<void>,
): Promise<SuccessfullSave | FailedSave> {
	eventListener?.('DEBOUNCING');
	return new Promise((resolve) => {
		setTimeout(async () => {
			eventListener?.('DIFFING_LIVE_STATE');
			if (stateHasChanged(newState, get(lastState))) {
				eventListener?.('ABORTING');
				return resolve({ success: false });
			}
			eventListener?.('FETCHING_LAST_SAVE');
			const resLatestSave = await fetch('/api/load?secret=' + newState.secret);
			if (!resLatestSave.ok) {
				eventListener?.('ERROR');
				return resolve({ success: false });
			}
			const parsed = z
				.object({ registration: serverDataSchema })
				.safeParse((await resLatestSave.json()) as unknown);
			if (!parsed.success) {
				eventListener?.('ERROR');
				return resolve({ success: false });
			}
			eventListener?.('DIFFING_LAST_SAVE');
			if (!stateHasChanged(newState, parsed.data.registration)) {
				eventListener?.('NO_NEW_STATE');
				return resolve({ success: false });
			}
			eventListener?.('DIFFING_LIVE_STATE');
			if (stateHasChanged(newState, get(lastState))) {
				eventListener?.('ABORTING');
				return resolve({ success: false });
			}
			const updatedState = updateMeta(newState, parsed.data.registration.progress);
			eventListener?.('SAVING');
			const resSave = await fetch('/api/save', {
				method: 'POST',
				body: JSON.stringify(updatedState),
				headers: headerJSON,
			});
			if (!resSave.ok) {
				eventListener?.('ERROR');
				return resolve({ success: false });
			}
			const body = z.object({ id: z.string().uuid() }).safeParse((await resSave.json()) as unknown);
			if (!body.success) {
				eventListener?.('ERROR');
				return resolve({ success: false });
			}
			eventListener?.('SAVED');
			resolve({ success: true, id: body.data.id });
		}, 1000);
	});
}

function stateHasChanged(n: SaveSchema, l: SaveSchema): boolean {
	const compareSchema = saveSchema.omit({ previous_registration_entry: true, progress: true, valid_by_client: true });
	const newState = compareSchema.parse(n);
	const lastState = compareSchema.parse(l);
	return !_.isEqual(newState, lastState);
}

const nextProgress = (valid: boolean, progress: Progress): Progress => {
	const alreadyOnceConfirmed: Progress[] = ["CONFIRMED", "CONFIRMED_W_INVALID_CHANGES", "CONFIRMED_W_VALID_CHANGES", "RECONFIRMED"];
	if (alreadyOnceConfirmed.includes(progress)) {
		if (valid) {
			return "CONFIRMED_W_VALID_CHANGES";
		}
		return "CONFIRMED_W_INVALID_CHANGES";
	}
	return "IN_PROGRESS";
}

const updateMeta = (appState: AppState, prevProgress: Progress): AppState => {
	const v = validateState(appState);
	const valid_by_client = !v.all;
	const progress = nextProgress(valid_by_client, prevProgress);
	return { ..._.clone(appState), valid_by_client, progress };
}