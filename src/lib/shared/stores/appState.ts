import { writable } from 'svelte/store';
import { z } from 'zod';
import type { AppState } from '../schema/app';
import type { ServerData } from '../schema/server';

export function initAppState(id: string, secret: string, serverData: ServerData) {
	const appState = writable<AppState>({
		id: z.string().uuid().parse(id),
		secret: z.string().uuid().parse(secret),
		previous_registration_entry: z.string().uuid().parse(serverData.id),
		name: serverData.name,
		email: serverData.email,
		wants_to_help: serverData.wants_to_help,
		name_friend_one: serverData.name_friend_one ?? '',
		name_friend_two: serverData.name_friend_two ?? '',
		page: 'kontaktperson',
	});
	return appState;
}
