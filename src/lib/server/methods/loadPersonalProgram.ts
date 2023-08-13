import { serverDataSchema, type ServerData, type PersonalData } from "$lib/shared/schema/server.types";
import demo_data from "./demo_data.json";
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
    // const base = OLYMP + '/flows/trigger/bca00e9a-0e24-4eba-a4fc-90321af45289';
    // const url = new URL(base);
    // url.searchParams.set('secret', secret);
    // if (env.OLYMP_TOKEN === undefined) {
    // return { success: false, status: "0140" };
    // }
    // url.searchParams.set('access_token', env.OLYMP_TOKEN);

    // const res = await fetch(url);
    // if (!res.ok) {
    // return { success: false, status: "0144-" + res.status };
    // }
    // const json = await res.json();
    // const parsed = responseSchema.safeParse(json);

    // if (!parsed.success) {
    // return { success: false, status: "0142-" + res.status };
    // }

    const parsed = serverDataSchema.safeParse(demo_data);
    if (!parsed.success) {
        throw new Error("Should not happen with demo data 1");
        // TODO
        // return { success: false, status: "0142-" + res.status };
    }

    const personalData = parsed.data.anmeldungen[id];
    if (personalData === undefined) {
        throw new Error("Should not happen with demo data 2");
        // TODO
        // return { success: false, status: "0146-" + res.status + "; ID does not exist" };
    }

    const specialCases = generateSpecialCases(parsed.data);
    const personalDataCleaned = applySpeicalCases(personalData, specialCases);

    return {
        success: true,
        personalData: personalDataCleaned
    }
}