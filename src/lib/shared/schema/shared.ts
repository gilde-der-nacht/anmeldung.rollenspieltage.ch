import { z } from 'zod';

export const AGE_GROUPS = ['CHILD', 'TEEN', 'ADULT'] as const;
export const ageGroupEnum = z.enum(AGE_GROUPS);
export type AgeGroup = z.infer<typeof ageGroupEnum>;

export const DAYS = ['SATURDAY', 'SUNDAY'] as const;
export const dayEnum = z.enum(DAYS);
export type Day = z.infer<typeof dayEnum>;

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