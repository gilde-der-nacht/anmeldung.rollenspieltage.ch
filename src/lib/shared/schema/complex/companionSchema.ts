import { z } from "zod";
import { ageGroupEnumSchema, daysSchema } from "$lib/shared/schema/enums";

export const groupSchema = z.array(
    z.object({
        active: z.boolean(),
        name: z.string(),
        age_group: ageGroupEnumSchema,
        days: daysSchema,
    }),
).length(2);
export type Group = z.infer<typeof groupSchema>;