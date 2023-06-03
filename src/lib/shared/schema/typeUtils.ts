import type { AppState } from './app';
import type { ToSaveState } from './server';

export function convert(appState: AppState): ToSaveState {
	return {
		registration_participant: appState.id,
		previous_registration_entry: appState.previous_registration_entry,
		name: appState.name,
		email: appState.email,
		wants_to_help: appState.wants_to_help,
		name_friend_one: appState.name_friend_one,
		name_friend_two: appState.name_friend_two,
	};
}
