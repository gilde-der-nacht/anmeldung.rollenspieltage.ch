import { AppState } from "@util/AppState";

export const getServerData = async (): Promise<AppState> => {
  return await new Promise((res, rej) =>
    setTimeout(() => rej({ test: true }), 500)
  );
};
