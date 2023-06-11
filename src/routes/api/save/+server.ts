import { saveRegistration } from '$lib/server/methods/saveRegistration';
import { appStateSchema } from '$lib/shared/schema/app';
import { json, error, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	const appState = appStateSchema.parse((await request.json()) as unknown);
	const res = await saveRegistration(appState);
	if (!res.success) {
		throw error(400, 'Konnte nicht gespeichert werden.');
	}
	return json({ id: res.id });
}) satisfies RequestHandler;
