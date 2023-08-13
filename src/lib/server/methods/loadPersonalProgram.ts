import { OLYMP } from "$lib/Constants";
import { serverDataSchema, type ServerData, type PersonalData } from "$lib/shared/schema/server.types";
import { z } from "zod";
import { applySpeicalCases, generateSpecialCases } from "./specialCaseUtil";

type SuccessfullLoad = {
    success: true;
    personalData: PersonalData;
};

type FailedLoad = {
    success: false;
    status: string;
};

export async function loadPersonalProgram(id: string): Promise<SuccessfullLoad | FailedLoad> {
    const base = OLYMP + '/items/global_23';
    const url = new URL(base);

    const res = await fetch(url);
    if (!res.ok) {
        return { success: false, status: "0944-" + res.status };
    }
    const json = await res.json();
    const parsed = z.object({
        data: z.object({
            program: serverDataSchema
        })
    }).safeParse(json);

    if (!parsed.success) {
        return { success: false, status: "0142-" + res.status };
    }

    const personalData = parsed.data.data.program.anmeldungen[id];
    if (personalData === undefined) {
        return { success: false, status: "0146-" + res.status + "; ID does not exist" };
    }

    const specialCases = generateSpecialCases(parsed.data.data.program);
    const personalDataCleaned = applySpeicalCases(personalData, specialCases);

    return {
        success: true,
        personalData: personalDataCleaned
    }
}