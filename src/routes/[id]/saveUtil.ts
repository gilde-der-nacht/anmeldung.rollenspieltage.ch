import { save, type SaveState } from '$lib/shared/save';
import type { AppState } from '$lib/shared/schema/app';
import _ from 'lodash';
import { readonly, type Writable } from 'svelte/store';

export const saveOnUpdate =
	(appState: Writable<AppState>, pushState: (newState: SaveState) => void) => () => {
		appState.subscribe(async (state) => {
			const res = await save(_.clone(state), readonly(appState), async (state) => {
				switch (state) {
					case 'SAVING':
						pushState('SAVING');
						break;

					case 'ERROR':
						pushState('ERROR');
						break;

					case 'SAVED':
						pushState('SAVED');
						break;

					default:
						break;
				}
			});
			if (res.success) {
				appState.update((prev) => ({ ...prev, previous_registration_entry: res.id }));
			}
		});
	};
