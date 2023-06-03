import { z } from 'zod';
import type { AppState } from './schema/app';
import { headerJSON } from './common';

type SuccessfullSave = {
	success: true;
	id: string;
};

type FailedSave = {
	success: false;
	status: number;
};

export async function save(state: AppState): Promise<SuccessfullSave | FailedSave> {
	try {
		const res = await fetch('/api/save', {
			method: 'POST',
			body: JSON.stringify(state),
			headers: headerJSON,
		});

		if (!res.ok) {
			return { success: false, status: res.status };
		}

		const body = z.object({ id: z.string().uuid() }).safeParse((await res.json()) as unknown);
		if (!body.success) {
			return { success: false, status: res.status };
		}
		return { success: true, id: body.data.id };
	} catch (error) {
		return { success: false, status: 400 };
	}
}
