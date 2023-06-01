import { TARTAROS } from '$lib/Constants';
import { z } from 'zod';
import { uuidSchema, type Data, allDataSchema } from '../schema';

type SuccessfullLoad = {
	success: true;
	id: string;
	secret: string;
	registration: Data;
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
	registrations: z.array(allDataSchema).nonempty(),
});

export async function loadBySecret(
	id: string,
	secret: string,
): Promise<SuccessfullLoad | FailedRegistration> {
	const base = TARTAROS + '/webhook/26bda799-cc26-40b0-b0f5-9167738c4896';
	const url = new URL(base);
	url.searchParams.set('id', id);
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
		id: id,
		secret: secret,
		registration: latestRegistration,
	};
}
