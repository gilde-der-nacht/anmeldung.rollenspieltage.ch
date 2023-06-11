import { z } from 'zod';
import { pageEnum } from './ navigation';
import { ageGroupEnumSchema, eatPreferenceEnumSchema, gameLength2EnumSchema, genresSchema } from './enums';
import { gameRoundsSchema } from './complex/gameRoundSchema';

const daysSchema = z.object({
	saturday: z.boolean(),
	sunday: z.boolean()
})

const groupEntry = z.object({
	active: z.boolean(),
	name: z.string(),
	age_group: ageGroupEnumSchema,
	days: daysSchema,
});
const groupSchema = z.object({
	one: groupEntry,
	two: groupEntry,
});
export type Group = z.infer<typeof groupSchema>;

export const clientSaveState = z.object({
	registration_participant: z.string().uuid(),
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
	game_rounds: gameRoundsSchema,
});

export type ClientSaveState = z.infer<typeof clientSaveState>;

export const appStateSchema = clientSaveState.extend({
	id: z.string().uuid(),
	secret: z.string().uuid(),
	previous_registration_entry: z.string().uuid(),
	page: pageEnum,
});
export type AppState = z.infer<typeof appStateSchema>;
