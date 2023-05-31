import { z } from 'zod';

export const uuidSchema = z.string().uuid();
export type UUID = z.infer<typeof uuidSchema>;

export const nameSchema = z.string().trim().min(1);
export type Name = z.infer<typeof nameSchema>;
export const emailSchema = z.string().trim().email();
export type Email = z.infer<typeof emailSchema>;

export const itemSchema = z.object({
	data: z.object({ id: uuidSchema }),
});

export const allDataSchema = z.object({
	date_created: z.string(),
});
export type Data = z.infer<typeof allDataSchema>;
