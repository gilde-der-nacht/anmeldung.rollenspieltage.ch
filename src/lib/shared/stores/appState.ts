import type { ServerData } from '$lib/api/schema';
import { writable } from 'svelte/store';
import { z } from 'zod';

const appStateSchema = z.object({
	id: z.string().uuid(),
	secret: z.string().uuid(),
	previous_registration_entry: z.string().uuid(),
	name: z.string(),
	email: z.string(),
	wants_to_help: z.boolean(),
	name_friend_one: z.string(),
	name_friend_two: z.string(),
});
type AppState = z.infer<typeof appStateSchema>;

export const initAppState = (id: string, secret: string, serverData: ServerData) => {
	const appState = writable<AppState>({
		id: z.string().uuid().parse(id),
		secret: z.string().uuid().parse(secret),
		previous_registration_entry: z.string().uuid().parse(serverData.id),
		name: serverData.name,
		email: serverData.email,
		wants_to_help: serverData.wants_to_help,
		name_friend_one: serverData.name_friend_one ?? '',
		name_friend_two: serverData.name_friend_two ?? '',
	});
	return appState;
};
