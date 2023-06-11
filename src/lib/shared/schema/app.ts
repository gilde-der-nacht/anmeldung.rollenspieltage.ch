import { z } from 'zod';
import { ageGroupEnum, eatPrefEnum, gameLengthEnum, gameRoundSchema, genreEnum } from './shared';
import { pageEnum } from './ navigation';

const daysSchema = z.object({
	saturday: z.boolean(),
	sunday: z.boolean()
})

const groupEntry = z.object({
	active: z.boolean(),
	name: z.string(),
	age_group: ageGroupEnum,
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
	age_group: ageGroupEnum,
	wants_to_help: z.boolean(),
	group: groupSchema,
	days: daysSchema,
	saturday_starttime: z.nullable(z.number()),
	saturday_endtime: z.nullable(z.number()),
	sunday_starttime: z.nullable(z.number()),
	sunday_endtime: z.nullable(z.number()),
	eat_preference: eatPrefEnum,
	wants_to_play: z.boolean(),
	preferred_game_length: gameLengthEnum,
	genres: z.array(genreEnum),
	wants_to_master: z.boolean(),
	game_rounds: z.array(gameRoundSchema),
});

export type ClientSaveState = z.infer<typeof clientSaveState>;

export const appStateSchema = clientSaveState.extend({
	id: z.string().uuid(),
	secret: z.string().uuid(),
	previous_registration_entry: z.string().uuid(),
	page: pageEnum,
});
export type AppState = z.infer<typeof appStateSchema>;
