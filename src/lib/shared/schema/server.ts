import { z } from 'zod';
import { saveSchema } from './complex/saveSchema';

export const uuidSchema = z.string().uuid();
export const nameSchema = z.string().trim().min(1);
export const emailSchema = z.string().trim().email();

export const serverDataSchema = saveSchema.extend({
	id: z.string().uuid(),
	date_created: z.string(),
});
export type ServerData = z.infer<typeof serverDataSchema>;

