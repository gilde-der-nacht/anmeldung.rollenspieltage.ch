import { save, type SaveState } from '$lib/shared/save';
import type { AppState } from '$lib/shared/schema/app';
import type { Progress } from '$lib/shared/schema/enums';
import _ from 'lodash';
import { readonly, type Writable } from 'svelte/store';

export const saveOnUpdate =
	(appState: Writable<AppState>,
		progressState: Writable<Progress>,
		pushState: (newState: SaveState) => void) => () => {
			appState.subscribe(async (state) => {
				const currProgress = state.progress;
				if (currProgress !== "IN_PROGRESS" && currProgress !== "INITIALIZED") {
					progressState.set("CONFIRMED_W_INVALID_CHANGES");
				}
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

						case "NO_NEW_STATE":
							progressState.set(currProgress);

						default:
							break;
					}
				});
				if (res.success) {
					appState.update((prev) => ({ ...prev, previous_registration_entry: res.id }));
					progressState.set(res.newProgress);
				}
			});
		};
