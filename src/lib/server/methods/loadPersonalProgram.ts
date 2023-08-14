import { OLYMP } from "$lib/Constants";
import { serverDataSchema, type PersonalData, type ServerData } from "$lib/shared/schema/server.types";
import { z } from "zod";
import { applySpecialCases, generateSpecialCases } from "../specialCaseUtil";
import { transform } from "../transform";
import { generateEnglishCases } from "../englishCases";

type SuccessfullLoad = {
    success: true;
    personalData: PersonalData;
};

type FailedLoad = {
    success: false;
    status: string;
};

async function proxy(id: string): Promise<({ program: ServerData; } & { res?: Response; }) | (FailedLoad)> {
    if (["295b18a9-8d03-4355-a543-d5796d2c011b", "40a7d68b-16c6-4807-8337-df3b757958ea"].includes(id)) {
        return { program: generateEnglishCases(id as any) };
    }
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
    return { program: parsed.data.data.program, res };
}

export async function loadPersonalProgram(id: string): Promise<SuccessfullLoad | FailedLoad> {
    const pReturn = await proxy(id);

    if ("success" in pReturn) {
        return pReturn;
    }

    const transformed = transform(pReturn.program);

    const personalData = transformed.anmeldungen[id];
    if (personalData === undefined) {
        return { success: false, status: "0146-" + pReturn.res?.status + "; ID does not exist" };
    }

    const specialCases = generateSpecialCases(transformed);
    const personalDataCleaned = applySpecialCases(personalData, specialCases);

    return {
        success: true,
        personalData: personalDataCleaned
    };
}