import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadBySecret } from '$lib/api/methods/loadBySecret';

export const load = (async ({ params, url }) => {
	const secret = url.searchParams.get('secret');
	const created = url.searchParams.get('created') === 'true';

	if (secret === null) {
		throw error(401, "'Secret' fehlt.");
	}

	const res = await loadBySecret(params.id, secret);
	if (!res.success) {
		return fail(res.status, { serverError: true });
	}

	return { ...res, created };
}) satisfies PageServerLoad;
