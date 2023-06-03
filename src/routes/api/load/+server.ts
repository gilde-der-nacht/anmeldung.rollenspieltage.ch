import { loadLatestSave } from '$lib/server/methods/loadLatestSave';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const GET = (async ({ url }) => {
	const secret = z.string().uuid().parse(url.searchParams.get('secret'));
	const res = await loadLatestSave(secret);
	if (!res.success) {
		throw error(400, 'Letzter Save konnte nicht geladen werden.');
	}
	return json({ registration: res.registration });
}) satisfies RequestHandler;
