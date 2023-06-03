import { z } from 'zod';

export const appStateSchema = z.object({
	id: z.string().uuid(),
	secret: z.string().uuid(),
	previous_registration_entry: z.string().uuid(),
	name: z.string(),
	email: z.string(),
	wants_to_help: z.boolean(),
	name_friend_one: z.string(),
	name_friend_two: z.string(),
});
export type AppState = z.infer<typeof appStateSchema>;

export type ClientSaveState = Omit<AppState, 'id' | 'secret' | 'previous_registration_entry'>;
