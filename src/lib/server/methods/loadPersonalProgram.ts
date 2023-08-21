import { OLYMP } from "$lib/Constants";
import { applySpecialCases, generateSpecialCases } from "../specialCaseUtil";
import { transform } from "../transform";
import { generateEnglishCases } from "../englishCases";
import type { PersonalData, ServerData } from "$lib/shared/schema/server.types";

export type SuccessfullLoad = {
    success: true;
    personalData: PersonalData;
};

export type FailedLoad = {
    success: false;
    status: string;
};

export async function loadPersonalProgram(id: string, global: ServerData): Promise<SuccessfullLoad | FailedLoad> {
    let pReturn: ServerData = global;
    if (["295b18a9-8d03-4355-a543-d5796d2c011b", "40a7d68b-16c6-4807-8337-df3b757958ea"].includes(id)) {
        pReturn = generateEnglishCases(id as any);
    }

    const transformed = transform(pReturn);

    const personalData = transformed.anmeldungen[id];
    if (personalData === undefined) {
        return { success: false, status: "0146 ID does not exist" };
    }

    const specialCases = generateSpecialCases(transformed);
    const personalDataCleaned = applySpecialCases(personalData, specialCases);

    return {
        success: true,
        personalData: personalDataCleaned
    };
}