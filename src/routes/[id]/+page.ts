import type { PageLoad } from './$types';

export const load = (({ params, url }) => {
	const secret = url.searchParams.get('secret');
	const created = url.searchParams.get('created') === 'true';

	return { id: params.id, secret, created };
}) satisfies PageLoad;
