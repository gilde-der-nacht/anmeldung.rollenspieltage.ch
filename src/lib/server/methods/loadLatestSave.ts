import type { ServerData } from '$lib/shared/schema/server';
import { loadBySecret } from './loadBySecret';

type SuccessfullLoad = {
	success: true;
	registration: ServerData;
};

type FailedLoad = {
	success: false;
	status: string;
};

export async function loadLatestSave(secret: string): Promise<SuccessfullLoad | FailedLoad> {
	const res = await loadBySecret(secret);
	if (!res.success) {
		return res;
	}
	return { success: true, registration: res.registration };
}
