import { z } from 'zod';

const clientSaveState = z.object({
	name: z.string(),
	email: z.string(),
	wants_to_help: z.boolean(),
	name_friend_one: z.string(),
	name_friend_two: z.string(),
});
export type ClientSaveState = z.infer<typeof clientSaveState>;

export const appStateSchema = clientSaveState.extend({
	id: z.string().uuid(),
	secret: z.string().uuid(),
	previous_registration_entry: z.string().uuid(),
	page: z.enum(['kontaktperson', 'gruppe']),
});
export type AppState = z.infer<typeof appStateSchema>;
