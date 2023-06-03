import { z } from 'zod';

export const uuidSchema = z.string().uuid();
export const nameSchema = z.string().trim().min(1);
export const emailSchema = z.string().trim().email();

export const itemSchema = z.object({
	data: z.object({ id: uuidSchema }),
});

export const serverDataSchema = z.object({
	id: z.string().uuid(),
	date_created: z.string(),
	registration_participant: z.string().uuid(),
	wants_to_help: z.boolean(),
	name_friend_one: z.nullable(z.string()),
	name_friend_two: z.nullable(z.string()),
	name: z.string(),
	email: z.string(),
});
export type ServerData = z.infer<typeof serverDataSchema>;
