import { z } from 'zod';
import { groupSchema } from './complex/companionSchema';
import { ageGroupEnumSchema, daysSchema, eatPreferenceEnumSchema, gameLength2EnumSchema, genresSchema } from './enums';
import { gameRoundsSchema } from './complex/gameRoundSchema';

export const uuidSchema = z.string().uuid();
export const nameSchema = z.string().trim().min(1);
export const emailSchema = z.string().trim().email();

export const toSaveStateSchema = z.object({
	registration_participant: z.string().uuid(),
	previous_registration_entry: z.nullable(z.string()),
	name: z.string(),
	email: z.string(),
	age_group: ageGroupEnumSchema,
	wants_to_help: z.boolean(),
	group: groupSchema,
	days: daysSchema,
	saturday_starttime: z.nullable(z.number()),
	saturday_endtime: z.nullable(z.number()),
	sunday_starttime: z.nullable(z.number()),
	sunday_endtime: z.nullable(z.number()),
	eat_preference: eatPreferenceEnumSchema,
	wants_to_play: z.boolean(),
	preferred_game_length: gameLength2EnumSchema,
	genres: genresSchema,
	wants_to_master: z.boolean(),
	game_rounds: z.nullable(gameRoundsSchema),
});
export type ToSaveState = z.infer<typeof toSaveStateSchema>;

export const serverDataSchema = toSaveStateSchema.extend({
	id: z.string().uuid(),
	date_created: z.string(),
});
export type ServerData = z.infer<typeof serverDataSchema>;

