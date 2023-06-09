import { z } from 'zod';
import { ageGroupEnum, dayEnum } from './shared';

export const uuidSchema = z.string().uuid();
export const nameSchema = z.string().trim().min(1);
export const emailSchema = z.string().trim().email();

export const itemSchema = z.object({
	data: z.object({ id: uuidSchema }),
});

export const groupSchema = z.array(
	z.object({
		active: z.boolean(),
		name: z.string(),
		age_group: ageGroupEnum,
		days: z.array(dayEnum),
	}),
);

export const serverDataSchema = z.object({
	id: z.string().uuid(),
	date_created: z.string(),
	registration_participant: z.string().uuid(),
	previous_registration_entry: z.nullable(z.string()),
	name: z.string(),
	email: z.string(),
	age_group: ageGroupEnum,
	wants_to_help: z.boolean(),
	group: groupSchema,
	days: z.array(dayEnum),
});
export type ServerData = z.infer<typeof serverDataSchema>;

export type ToSaveState = Omit<ServerData, 'id' | 'date_created'>;
