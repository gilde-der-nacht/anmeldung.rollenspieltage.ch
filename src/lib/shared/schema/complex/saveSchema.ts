import { z } from 'zod';
import { ageGroupEnumSchema, daysSchema, eatPreferenceEnumSchema, gameLength2EnumSchema, genresSchema, progressEnumSchema, visitedPagesSchema } from '$lib/shared/schema/enums';
import { gameRoundsSchema } from '$lib/shared/schema/complex/gameRoundSchema';
import { groupSchema } from '$lib/shared/schema/complex/companionSchema';

export const saveSchema = z.object({
    registration_participant: z.string().uuid(),
    previous_registration_entry: z.nullable(z.string()),
    name: z.string(),
    email: z.string(),
    visited_pages: visitedPagesSchema,
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
    valid_by_client: z.boolean(),
    progress: progressEnumSchema,
    workshop_ideas: z.nullable(z.string())
});
export type SaveSchema = z.infer<typeof saveSchema>;