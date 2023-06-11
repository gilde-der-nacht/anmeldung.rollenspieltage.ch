import { OLYMP } from '$lib/Constants';
import { z } from 'zod';
import { headerJSON } from '../../shared/common';
import { uuidSchema } from '$lib/shared/schema/server';

type SuccessfullRegistration = {
	success: true;
	id: string;
	secret: string;
};

type FailedRegistration = {
	success: false;
	status: string;
};

export const itemSchema = z.object({
	data: z.object({ id: uuidSchema }),
});

export async function initializeRegistration(
	name: string,
	email: string,
): Promise<SuccessfullRegistration | FailedRegistration> {
	const secret = crypto.randomUUID();

	const resParticipant = await fetch(OLYMP + '/items/participant_23', {
		method: 'POST',
		headers: headerJSON,
		body: JSON.stringify({ secret }),
	});

	if (!resParticipant.ok) {
		return { success: false, status: "0041-" + resParticipant.status };
	}
	const parsed = itemSchema.safeParse((await resParticipant.json()) as unknown);

	if (!parsed.success) {
		return { success: false, status: "0044-" + resParticipant.status };
	}

	const { id } = parsed.data.data;

	const resRegistration = await fetch(OLYMP + '/items/registration_23', {
		method: 'POST',
		headers: headerJSON,
		body: JSON.stringify({ name, email, registration_participant: id }),
	});

	if (!resRegistration.ok) {
		return { success: false, status: "0072-" + resRegistration.status };
	}

	return { success: true, id, secret };
}
