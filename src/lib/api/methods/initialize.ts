import { OLYMP } from '$lib/Constants';
import { headerJSON } from '../common';
import { itemSchema, type Email, type Name, type UUID } from '../schema';

type SuccessfullRegistration = {
	success: true;
	id: UUID;
	secret: UUID;
};

type FailedRegistration = {
	success: false;
	status: number;
};

export async function initializeRegistration(
	name: Name,
	email: Email,
): Promise<SuccessfullRegistration | FailedRegistration> {
	const secret = crypto.randomUUID();

	const res = await fetch(OLYMP + '/items/participant_23', {
		method: 'POST',
		headers: headerJSON,
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
