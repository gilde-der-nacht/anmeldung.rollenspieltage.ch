import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadPersonalProgram } from '$lib/server/methods/loadPersonalProgram';
import { convertToWeb } from '$lib/server/methods/converter';

export const load = (async ({ params }) => {
	const res = await loadPersonalProgram(params.id);
	if (!res.success) {
		throw error(401, res.status);
	}
	const webData = convertToWeb(res.personalData);

	return { id: params.id, webData };
}) satisfies PageServerLoad;
