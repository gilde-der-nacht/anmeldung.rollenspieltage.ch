import { OLYMP } from '$lib/Constants';
import { loadConfigFromFile } from 'vite';
import { headerJSON } from '../common';
import { itemSchema, type Email, type Name } from '../schema';

type SuccessfullRegistration = {
	success: true;
	id: string;
	secret: string;
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

	const resParticipant = await fetch(OLYMP + '/items/participant_23', {
		method: 'POST',
		headers: headerJSON,
		body: JSON.stringify({ secret }),
	});

	if (!resParticipant.ok) {
		return { success: false, status: resParticipant.status };
	}
	const parsed = itemSchema.safeParse((await resParticipant.json()) as unknown);

	if (!parsed.success) {
		return { success: false, status: resParticipant.status };
	}

	const { id } = parsed.data.data;

	const resRegistration = await fetch(OLYMP + '/items/registration_23', {
		method: 'POST',
		headers: headerJSON,
		body: JSON.stringify({ name, email, registration_participant: id }),
	});

	if (!resRegistration.ok) {
		return { success: false, status: resRegistration.status };
	}

	return { success: true, id, secret };
}
