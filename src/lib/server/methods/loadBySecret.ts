import { env } from "$env/dynamic/private";
import { OLYMP } from '$lib/Constants';
import { uuidSchema, type ServerData, serverDataSchema } from '$lib/shared/schema/server';
import { z } from 'zod';

type SuccessfullLoad = {
	success: true;
	id: string;
	secret: string;
	registration: ServerData;
};

type FailedLoad = {
	success: false;
	status: string;
};

const responseSchema = z.object({
	participant: z.object({
		id: uuidSchema,
		secret: uuidSchema,
	}),
	registrations: z.array(serverDataSchema).nonempty(),
});

export async function loadBySecret(secret: string): Promise<SuccessfullLoad | FailedLoad> {
	const base = OLYMP + '/flows/trigger/bca00e9a-0e24-4eba-a4fc-90321af45289';
	const url = new URL(base);
	url.searchParams.set('secret', secret);
	if (env.OLYMP_TOKEN === undefined) {
		return { success: false, status: "0140" };
	}
	url.searchParams.set('access_token', env.OLYMP_TOKEN);

	const res = await fetch(url);
	if (!res.ok) {
		return { success: false, status: "0144-" + res.status };
	}
	const json = await res.json();
	const parsed = responseSchema.safeParse(json);

	if (!parsed.success) {
		console.log(parsed.error);

		return { success: false, status: "0142-" + res.status };
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
