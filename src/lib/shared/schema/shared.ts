import { z } from 'zod';

export const AGE_GROUPS = ['CHILD', 'TEEN', 'ADULT'] as const;
export const ageGroupEnum = z.enum(AGE_GROUPS);
export type AgeGroup = z.infer<typeof ageGroupEnum>;

export const DAYS = ['SATURDAY', 'SUNDAY'] as const;
export const dayEnum = z.enum(DAYS);
export type Day = z.infer<typeof dayEnum>;
