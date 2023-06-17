import _ from "lodash";
import type { AppState } from "./schema/app";
import { headerJSON } from "./common";
import { z } from "zod";
import { serverDataSchema } from "./schema/server";
import { validateState } from "./validation";
import type { Progress } from "./schema/enums";
type SuccessfullConfirmation = {
    success: true;
    id: string;
    newProgress: Progress;
};

type FailedConfirmation = {
    success: false;
};
export async function confirm(appState: AppState): Promise<SuccessfullConfirmation | FailedConfirmation> {
    return new Promise(async (resolve) => {
        const resLatestSave = await fetch('/api/load?secret=' + appState.secret);
        if (!resLatestSave.ok) {
            return resolve({ success: false });
        }

        const parsed = z
            .object({ registration: serverDataSchema })
            .safeParse((await resLatestSave.json()) as unknown);
        if (!parsed.success) {
            return resolve({ success: false });
        }

        const updatedState = updateMeta(appState, parsed.data.registration.progress);

        if (!updatedState.valid_by_client) {
            return resolve({ success: false });
        }

        const resConfirmation = await fetch('/api/confirm', {
            method: 'POST',
            body: JSON.stringify(updatedState),
            headers: headerJSON,
        });

        if (!resConfirmation.ok) {
            return resolve({ success: false });
        }

        const body = z.object({ id: z.string().uuid() }).safeParse((await resConfirmation.json()) as unknown);
        if (!body.success) {
            return resolve({ success: false });
        }
        resolve({ success: true, id: body.data.id, newProgress: updatedState.progress });

    })
}

const nextProgress = (progress: Progress): Progress => {
    const alreadyOnceConfirmed: Progress[] = ["CONFIRMED", "CONFIRMED_W_INVALID_CHANGES", "CONFIRMED_W_VALID_CHANGES", "RECONFIRMED"];
    if (alreadyOnceConfirmed.includes(progress)) {
        return "RECONFIRMED";
    }
    return "CONFIRMED";
}

const updateMeta = (appState: AppState, prevProgress: Progress): AppState => {
    const v = validateState(appState);
    const valid_by_client = !v.all;
    const progress = nextProgress(prevProgress);
    return { ..._.clone(appState), valid_by_client, progress };
}