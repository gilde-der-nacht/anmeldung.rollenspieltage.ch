import { AppState } from "@util/AppState";
import { parseRawData } from "@api/parse";
import { aggregateData } from "./aggregate";

const RESOURCE_UID =
  "b0aa35bf4975af53132902fd615ade2e9039369e19531a5dfc4df0f81d6ba394";

const ENDPOINT = `https://api.gildedernacht.ch/resources/${RESOURCE_UID}/registration`;

export const getServerData = async (secret: string): Promise<AppState> => {
  if (secret.trim().length === 0) {
    return await new Promise((res) => res({ hasLoaded: false }));
  }
  const serverData = await fetch(`${ENDPOINT}/${secret}`, {
    method: "GET",
    mode: "cors",
  });

  if (!serverData.ok) {
    return await new Promise((res, rej) => rej(serverData.statusText));
  }
  const rawData: unknown = await serverData.json();
  try {
    const parsedData = parseRawData(rawData);
    return aggregateData(parsedData);
  } catch (error) {
    return await new Promise((res, rej) => rej({ error }));
  }
};
