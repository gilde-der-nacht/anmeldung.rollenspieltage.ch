import { z } from 'zod';
import { pageEnumSchema } from './complex/navigation';
import { saveSchema } from './complex/saveSchema';

export const appStateSchema = saveSchema.extend({
	id: z.string().uuid(),
	secret: z.string().uuid(),
	page: pageEnumSchema,
});
export type AppState = z.infer<typeof appStateSchema>;
