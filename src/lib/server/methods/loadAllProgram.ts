import { loadPersonalProgram, type FailedLoad, type SuccessfullLoad } from "./loadPersonalProgram";
import { loadGlobal } from "./loadGlobal";
import type { PersonalData } from "$lib/shared/schema/server.types";

type SuccessfullLoadHere = {
  success: true;
  data: { [K: string]: PersonalData; };
};

type FailedLoadHere = {
  success: false;
  status: string;
};

const ENGLISH = ["295b18a9-8d03-4355-a543-d5796d2c011b", "40a7d68b-16c6-4807-8337-df3b757958ea"];

export async function loadAllProgram(): Promise<SuccessfullLoadHere | FailedLoadHere> {
  const global = await loadGlobal();
  if (global === null) {
    return { success: false, status: "342" };
  }

  const ids = ENGLISH.concat(Object.keys(global.anmeldungen));
  const promises = ids.map(id => new Promise<SuccessfullLoad | FailedLoad>((resolve) => {
    console.log(id);
    resolve(loadPersonalProgram(id, global));
  }));

  const results = await Promise.all(promises);
  const data: { [K: string]: PersonalData; } = {};
  for (let i = 0; i < results.length; i++) {
    const id = ids[i];
    const result = results[i];
    if (id === undefined || result === undefined) {
      return { success: false, status: "34t2" };
    }
    if (result.success) {
      data[id] = result.personalData;
    }
  }

  return { success: true, data };
}