import { OLYMP } from '$lib/Constants';
import { z } from 'zod';
import { headerJSON } from '$lib/shared/common';
import { saveSchema, type SaveSchema } from '$lib/shared/schema/complex/saveSchema';

const confirmResponseSchema = z.object({
    data: z.object({
        id: z.string().uuid(),
    }),
});

type SuccessfullConfirm = {
    success: true;
    id: string;
};

type FailedConfirm = {
    success: false;
    status: string;
};

export async function confirmRegistration(
    payload: SaveSchema,
): Promise<SuccessfullConfirm | FailedConfirm> {
    const parsed = saveSchema.parse(payload);
    const base = OLYMP + '/items/registration_23';
    const res = await fetch(base, {
        method: 'POST',
        headers: headerJSON,
        body: JSON.stringify(parsed),
    });

    if (!res.ok) {
        return { success: false, status: "0744-" + res.status };
    }

    const body = confirmResponseSchema.safeParse((await res.json()) as unknown);
    if (!body.success) {
        return { success: false, status: "0778-" + res.status };
    }

    return { success: true, id: body.data.data.id };
}
