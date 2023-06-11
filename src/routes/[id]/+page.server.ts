import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadBySecret } from '$lib/server/methods/loadBySecret';

export const load = (async ({ params, url }) => {
	const secret = url.searchParams.get('secret');
	const created = url.searchParams.get('created') === 'true';

	if (secret === null) {
		throw error(401, "'Secret' fehlt. (1043)");
	}

	const res = await loadBySecret(secret);
	if (!res.success) {
		throw error(401, "'Secret' ist ungültig. " + res.status);
	}

	if (res.id !== params.id) {
		throw error(401, "'Id' inkorrekt. (1032)");
	}

	return { ...res, id: params.id, secret, created };
}) satisfies PageServerLoad;
