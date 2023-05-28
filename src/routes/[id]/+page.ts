import type { PageLoad } from './$types';

export const load = (({ params, url }) => {
	const secret = url.searchParams.get('secret');
	return { id: params.id, secret };
}) satisfies PageLoad;
