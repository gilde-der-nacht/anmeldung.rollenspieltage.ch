import { z } from "zod";
import { ageGroupsSchema, gameLength2EnumSchema, genresSchema } from "$lib/shared/schema/enums";

export const gameRoundSchema = z.object({
    title: z.string(),
    system: z.string(),
    duration: gameLength2EnumSchema,
    player_count_min: z.number(),
    player_count_max: z.number(),
    genres: genresSchema,
    age_groups: ageGroupsSchema,
    active: z.boolean(),
    id: z.string().uuid(),
    date_created: z.string(),
});
export type GameRound = z.infer<typeof gameRoundSchema>;

export const gameRoundsSchema = z.array(gameRoundSchema);