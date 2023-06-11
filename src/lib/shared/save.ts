import { headerJSON } from './common';
import { get, type Readable } from 'svelte/store';
import { serverDataSchema } from './schema/server';
import _ from 'lodash';
import { saveSchema, type SaveSchema } from './schema/complex/saveSchema';
import type { AppState } from './schema/app';
import { z } from 'zod';

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
			eventListener?.('SAVING');
			const resSave = await fetch('/api/save', {
				method: 'POST',
				body: JSON.stringify(newState),
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
	const compareSchema = saveSchema.omit({ previous_registration_entry: true });
	const newState = compareSchema.parse(n);
	const lastState = compareSchema.parse(l);
	return !_.isEqual(newState, lastState);
}
