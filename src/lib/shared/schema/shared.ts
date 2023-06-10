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

export const GENRES = ['fantasy', 'science_fiction', "horror", "crime", "modern"] as const;
export const genreEnum = z.enum(GENRES);
export type Genre = z.infer<typeof genreEnum>;

export type Range = {
    range: number[];
    start: number;
    end: number;
}

export const toRange = (from: number, to: number): Range => {
    const _toRange = (from: number, to: number): number[] => {
        return Array(to - from).fill(0).map((_, i) => i + from);
    }

    if (from === to) {
        return {
            range: [from],
            start: from,
            end: from,
        };
    }

    if (from > to) {
        return {
            range: _toRange(to, from),
            start: to,
            end: from,
        };
    }
    return {
        range: _toRange(from, to),
        start: from,
        end: to,
    };
}