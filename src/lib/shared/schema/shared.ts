import { z } from 'zod';

export const AGE_GROUPS = ['CHILD', 'TEEN', 'ADULT'] as const;
export const ageGroupEnum = z.enum(AGE_GROUPS);
export type AgeGroup = z.infer<typeof ageGroupEnum>;

export const DAYS = ['SATURDAY', 'SUNDAY'] as const;
export const dayEnum = z.enum(DAYS);
export type Day = z.infer<typeof dayEnum>;

export const EAT_PREF = ['nothing_selected', 'plans_to_eat', "plans_not_to_eat"] as const;
export const eatPrefEnum = z.enum(EAT_PREF);
export type EatPref = z.infer<typeof eatPrefEnum>;

export const GAME_LENGTH = ["nothing_selected", "short_rounds", "long_rounds"] as const;
export const gameLengthEnum = z.enum(GAME_LENGTH);
export type GameLength = z.infer<typeof gameLengthEnum>;

export const GENRES = ['fantasy', 'science_fiction', "horror", "crime", "modern"] as const;
export const genreEnum = z.enum(GENRES);
export type Genre = z.infer<typeof genreEnum>;

