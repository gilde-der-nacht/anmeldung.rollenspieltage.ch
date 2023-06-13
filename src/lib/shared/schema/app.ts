import { z } from 'zod';
import { pageEnumSchema } from '$lib/shared/schema/complex/navigation';
import { saveSchema } from '$lib/shared/schema/complex/saveSchema';

export const appStateSchema = saveSchema.extend({
	id: z.string().uuid(),
	secret: z.string().uuid(),
	page: pageEnumSchema,
});
export type AppState = z.infer<typeof appStateSchema>;
