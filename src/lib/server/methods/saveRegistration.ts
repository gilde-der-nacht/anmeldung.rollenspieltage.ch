import { OLYMP } from '$lib/Constants';
import { toSaveStateSchema, type ToSaveState } from '$lib/shared/schema/server';
import { z } from 'zod';
import { headerJSON } from '../../shared/common';

const saveResponseSchema = z.object({
	data: z.object({
		id: z.string().uuid(),
	}),
});

type SuccessfullSave = {
	success: true;
	id: string;
};

type FailedSave = {
	success: false;
	status: string;
};

export async function saveRegistration(
	payload: ToSaveState,
): Promise<SuccessfullSave | FailedSave> {
	const parsed = toSaveStateSchema.parse(payload);
	const base = OLYMP + '/items/registration_23';
	const res = await fetch(base, {
		method: 'POST',
		headers: headerJSON,
		body: JSON.stringify(parsed),
	});

	if (!res.ok) {
		return { success: false, status: "0244-" + res.status };
	}

	const body = saveResponseSchema.safeParse((await res.json()) as unknown);
	if (!body.success) {
		return { success: false, status: "0278-" + res.status };
	}

	return { success: true, id: body.data.data.id };
}
