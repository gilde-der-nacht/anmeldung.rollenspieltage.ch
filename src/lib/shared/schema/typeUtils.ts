import type { AppState, ClientSaveState } from './app';
import type { ServerData, ToSaveState } from './server';

export function convertForServer(appState: AppState): ToSaveState {
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

export function convertForClient(serverState: ServerData): ClientSaveState {
	return {
		name: serverState.name,
		email: serverState.email,
		wants_to_help: serverState.wants_to_help,
		name_friend_one: serverState.name_friend_one ?? '',
		name_friend_two: serverState.name_friend_two ?? '',
	};
}
