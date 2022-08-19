import { AppState } from "@util/AppState";

export const getServerData = async (): Promise<AppState> => {
  return await new Promise((res, rej) =>
    setTimeout(
      () =>
        res({
          names: ["Adrian", "Oliver", "Andrea"],
          program: [
            { identifier: "lunch", day: "sa", time: 10 },
            { identifier: "helping", day: "sa", time: 11 },
          ],
        }),
      500
    )
  );
};
