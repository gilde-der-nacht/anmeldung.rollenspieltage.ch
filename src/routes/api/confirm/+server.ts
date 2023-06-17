import { confirmRegistration } from '$lib/server/methods/confirmRegistration';
import { appStateSchema, } from '$lib/shared/schema/app';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
    const appState = appStateSchema.parse((await request.json()) as unknown);
    const res = await confirmRegistration((appState));
    if (!res.success) {
        throw error(400, 'Konnte nicht abgeschickt werden.');
    }
    return json({ id: res.id });
}) satisfies RequestHandler;
