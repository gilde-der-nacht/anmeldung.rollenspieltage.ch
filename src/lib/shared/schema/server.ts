import { z } from 'zod';
import { ageGroupEnum, dayEnum, eatPrefEnum, gameLengthEnum, genreEnum } from './shared';

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
export type ServerGroup = z.infer<typeof groupSchema>;

export const toSaveStateSchema = z.object({
	registration_participant: z.string().uuid(),
	previous_registration_entry: z.nullable(z.string()),
	name: z.string(),
	email: z.string(),
	age_group: ageGroupEnum,
	wants_to_help: z.boolean(),
	group: groupSchema,
	days: z.array(dayEnum),
	saturday_starttime: z.nullable(z.number()),
	saturday_endtime: z.nullable(z.number()),
	sunday_starttime: z.nullable(z.number()),
	sunday_endtime: z.nullable(z.number()),
	eat_preference: eatPrefEnum,
	wants_to_play: z.boolean(),
	preferred_game_length: gameLengthEnum,
	genres: z.array(genreEnum),
});
export type ToSaveState = z.infer<typeof toSaveStateSchema>;

export const serverDataSchema = toSaveStateSchema.extend({
	id: z.string().uuid(),
	date_created: z.string(),
});
export type ServerData = z.infer<typeof serverDataSchema>;

