import { z } from "zod";
import { ageGroupsSchema, gameLength2EnumSchema, genresSchema } from "../enums";

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
});
export type GameRound = z.infer<typeof gameRoundSchema>;

export const gameRoundsSchema = z.array(gameRoundSchema);