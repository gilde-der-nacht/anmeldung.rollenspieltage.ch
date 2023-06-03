import { TARTAROS } from '$lib/Constants';
import { uuidSchema, type ServerData, serverDataSchema } from '$lib/shared/schema/server';
import { z } from 'zod';

type SuccessfullLoad = {
	success: true;
	id: string;
	secret: string;
	registration: ServerData;
};

type FailedRegistration = {
	success: false;
	status: number;
};

const responseSchema = z.object({
	participant: z.object({
		id: uuidSchema,
		secret: uuidSchema,
	}),
	registrations: z.array(serverDataSchema).nonempty(),
});

export async function loadBySecret(secret: string): Promise<SuccessfullLoad | FailedRegistration> {
	const base = TARTAROS + '/webhook/26bda799-cc26-40b0-b0f5-9167738c4896';
	const url = new URL(base);
	url.searchParams.set('secret', secret);

	const res = await fetch(url);
	if (!res.ok) {
		return { success: false, status: res.status };
	}

	const parsed = responseSchema.safeParse(await res.json());

	if (!parsed.success) {
		return { success: false, status: res.status };
	}

	const latestRegistration = parsed.data.registrations.sort((a, b) =>
		a.date_created > b.date_created ? -1 : 1,
	)[0];

	return {
		success: true,
		id: parsed.data.participant.id,
		secret: parsed.data.participant.secret,
		registration: latestRegistration,
	};
}
