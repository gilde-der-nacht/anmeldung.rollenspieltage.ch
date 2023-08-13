import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadPersonalProgram } from '$lib/server/methods/loadPersonalProgram';

export const load = (async ({ params }) => {
	const res = await loadPersonalProgram(params.id);
	if (!res.success) {
		throw error(401, res.status);
	}

	return { ...res, id: params.id, };
}) satisfies PageServerLoad;
