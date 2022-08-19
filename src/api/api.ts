import { AppState } from "@util/AppState";

export const getServerData = async (): Promise<AppState> => {
  return await new Promise((res, rej) =>
    setTimeout(() => res({ names: ["Adrian", "Oliver", "Andrea"], program: [] }), 500)
  );
};
