import { z } from 'zod';

export const AGE_GROUPS = ['CHILD', 'TEEN', 'ADULT'] as const;
export const ageGroupEnum = z.enum(AGE_GROUPS);
export type AgeGroup = z.infer<typeof ageGroupEnum>;
