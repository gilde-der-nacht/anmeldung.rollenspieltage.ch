import { OLYMP } from '$lib/Constants';
import { z } from 'zod';

export const uuidSchema = z.string().uuid();
type UUID = z.infer<typeof uuidSchema>;
export const nameSchema = z.string().trim().min(1);
type Name = z.infer<typeof nameSchema>;
export const emailSchema = z.string().trim().email();
type Email = z.infer<typeof emailSchema>;

const itemSchema = z.object({
	data: z.object({ id: uuidSchema }),
});

type SuccessfullRegistration = {
	success: true;
	id: UUID;
	secret: UUID;
};

type FailedRegistration = {
	success: false;
	status: number;
};

const headers = { 'Content-Type': 'application/json' };

export async function initializeRegistration(
	name: Name,
	email: Email,
): Promise<SuccessfullRegistration | FailedRegistration> {
	const secret = crypto.randomUUID();

	const res = await fetch(OLYMP + '/items/participant_23', {
		method: 'POST',
		headers,
		body: JSON.stringify({ name, email, secret }),
	});

	if (!res.ok) {
		return { success: false, status: res.status };
	}
	const parsed = itemSchema.safeParse((await res.json()) as unknown);

	if (!parsed.success) {
		return { success: false, status: res.status };
	}

	const { id } = parsed.data.data;

	return { success: true, id, secret };
}
