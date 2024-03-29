import { z } from "zod";

export const ageGroupList = ['CHILD', 'TEEN', 'ADULT'] as const;
export const ageGroupEnumSchema = z.enum(ageGroupList);
export type AgeGroup = z.infer<typeof ageGroupEnumSchema>;
export const ageGroupsSchema = z.array(ageGroupEnumSchema);

export const dayList = ['SATURDAY', 'SUNDAY'] as const;
export const dayEnumSchema = z.enum(dayList);
export type Day = z.infer<typeof dayEnumSchema>;
export const daysSchema = z.array(dayEnumSchema);

export const eatPreferenceList = ['plans_to_eat', "plans_not_to_eat", 'nothing_selected'] as const;
export const eatPreferenceEnumSchema = z.enum(eatPreferenceList);
export type EatPreference = z.infer<typeof eatPreferenceEnumSchema>;

export const gameLengthList = ["short_rounds", "long_rounds"] as const;
export const gameLengthEnumSchema = z.enum(gameLengthList);
export type GameLength = z.infer<typeof gameLengthEnumSchema>;

export const gameLength2List = [...gameLengthList, "nothing_selected"] as const;
export const gameLength2EnumSchema = z.enum(gameLength2List);
export type GameLength2 = z.infer<typeof gameLength2EnumSchema>;

export const genreList = ['fantasy', 'science_fiction', "horror", "crime", "modern"] as const;
export const genreEnumSchema = z.enum(genreList);
export type Genre = z.infer<typeof genreEnumSchema>;
export const genresSchema = z.array(genreEnumSchema);

export const visitedPageList = ['CONTACT', 'GROUP', "TIME", "PLAY", "MASTER", "SUMMARY"] as const;
export const visitedPageEnumSchema = z.enum(visitedPageList);
export type VisitedPage = z.infer<typeof visitedPageEnumSchema>;
export const visitedPagesSchema = z.array(visitedPageEnumSchema);

export const progressList = ['INITIALIZED', 'IN_PROGRESS', "CONFIRMED", "CONFIRMED_W_INVALID_CHANGES", "CONFIRMED_W_VALID_CHANGES", "RECONFIRMED"] as const;
export const progressEnumSchema = z.enum(progressList);
export type Progress = z.infer<typeof progressEnumSchema>;
export const progresssSchema = z.array(progressEnumSchema);
