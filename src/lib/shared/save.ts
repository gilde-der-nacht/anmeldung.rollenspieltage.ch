import { z } from 'zod';
import type { AppState, ClientSaveState } from './schema/app';
import { headerJSON } from './common';
import type { Readable } from 'svelte/store';
import { convertForClient } from './schema/typeUtils';
import { serverDataSchema } from './schema/server';

type SuccessfullSave = {
	success: true;
	id: string;
};

type FailedSave = {
	success: false;
};

type SaveState =
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
			if (stateHasChangedReadonlyStore(newState, lastState)) {
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
			if (!stateHasChanged(newState, convertForClient(parsed.data.registration))) {
				eventListener?.('NO_NEW_STATE');
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

function stateHasChangedReadonlyStore(n: AppState, l: Readable<AppState>): boolean {
	let hasChanged = false;
	const unsubscribe = l.subscribe((last) => {
		hasChanged = stateHasChanged(n, last);
	});
	unsubscribe();
	return hasChanged;
}

function stateHasChanged(n: ClientSaveState, l: ClientSaveState): boolean {
	let hasChanged = false;
	if (
		n.name !== l.name ||
		n.email !== l.email ||
		n.wants_to_help !== l.wants_to_help ||
		n.name_friend_one !== l.name_friend_one ||
		n.name_friend_two !== l.name_friend_two
	) {
		hasChanged = true;
	}
	return hasChanged;
}
