import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadPersonalProgram } from '$lib/server/methods/loadPersonalProgram';
import { convertToWeb } from '$lib/server/converter';
import { loadPersonalTimes } from '$lib/server/methods/loadPersonalTimes';

export const load = (async ({ params }) => {
	const res = await loadPersonalProgram(params.id);
	if (!res.success) {
		throw error(401, res.status);
	}
	const res2 = await loadPersonalTimes(params.id);
	if (!res2.success) {
		throw error(401, res2.status);
	}
	const webData = convertToWeb(res.personalData);

	return { id: params.id, webData, timeData: res2.timeData };
}) satisfies PageServerLoad;
