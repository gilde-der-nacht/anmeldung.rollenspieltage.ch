import { AppState } from "@util/AppState";

export const getServerData = async (): Promise<AppState> => {
  return await new Promise((res, rej) =>
    setTimeout(
      () =>
        res({
          names: ["Adrian", "Oliver", "Andrea"],
          program: [
            { identifier: "lunch", day: "sa", time: 10, duration: 1 },
            { identifier: "dinner", day: "sa", time: 11, duration: 2 },
          ],
        }),
      500
    )
  );
};
