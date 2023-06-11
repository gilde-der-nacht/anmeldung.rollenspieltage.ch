import { z } from 'zod';
import { pageEnumSchema } from './complex/navigation';
import { ageGroupEnumSchema, eatPreferenceEnumSchema, gameLength2EnumSchema, genresSchema } from './enums';
import { gameRoundsSchema } from './complex/gameRoundSchema';
import { saveSchema } from './complex/saveSchema';

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

export const clientSaveState = saveSchema;

export type ClientSaveState = z.infer<typeof clientSaveState>;

export const appStateSchema = clientSaveState.extend({
	id: z.string().uuid(),
	secret: z.string().uuid(),
	page: pageEnumSchema,
});
export type AppState = z.infer<typeof appStateSchema>;
