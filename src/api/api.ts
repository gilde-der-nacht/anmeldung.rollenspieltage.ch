import { AppState } from "@util/AppState";

export const getServerData = async (): Promise<AppState> => {
  return await new Promise((res, rej) =>
    setTimeout(
      () =>
        res({
          names: ["Adrian", "Oliver", "Andrea"],
          program: [
            { identifier: "nothing", day: "sa", time: 10, duration: 1 },
            {
              identifier: "gameMaster",
              day: "sa",
              time: 11,
              duration: 1,
              game: {
                title:
                  "Die Brücke über den Reik (Warhammer-Fantasy-Rollenspiel)",
                gameMaster: "Julian Ronneberger",
                players: ["Brühwiler Jonas", "Mario Anoniutti"],
                maxPlayerCount: 10,
              },
            },
            { identifier: "lunch", day: "sa", time: 12, duration: 1 },
            {
              identifier: "gameMaster",
              day: "sa",
              time: 13,
              duration: 2,
              game: {
                title:
                  "Die Brücke über den Reik (Warhammer-Fantasy-Rollenspiel)",
                gameMaster: "Julian Ronneberger",
                players: ["Brühwiler Jonas", "Mario Anoniutti"],
                maxPlayerCount: 5,
              },
            },
            { identifier: "kitchen", day: "sa", time: 15, duration: 1 },
            { identifier: "helping", day: "sa", time: 16, duration: 2 },
            { identifier: "dinner", day: "sa", time: 17, duration: 1 },
            {
              identifier: "workshop",
              day: "sa",
              time: 18,
              duration: 2,
              game: {
                title: "Warum spiele ich überhaupt Rollenspiele?",
                gameMaster: "Julian Ronneberger",
                players: ["Brühwiler Jonas", "Mario Anoniutti", "Clemens"],
                maxPlayerCount: 3,
              },
            },
            { identifier: "nothing", day: "sa", time: 20, duration: 2 },
            {
              identifier: "participate",
              day: "so",
              time: 10,
              duration: 2,
              game: {
                title: "D&D 5e: Super Happy Fun Murder Dungeon (Shortened)",
                gameMaster: "Julian Ronneberger",
                players: ["Brühwiler Jonas", "Mario Anoniutti", "Clemens"],
                maxPlayerCount: 4,
              },
            },
            { identifier: "lunch", day: "so", time: 12, duration: 1 },
            {
              identifier: "participate",
              day: "so",
              time: 13,
              duration: 1,
              game: {
                title: "D&D 5e: Super Happy Fun Murder Dungeon (Shortened)",
                gameMaster: "Julian Ronneberger",
                players: [],
                maxPlayerCount: 2,
              },
            },
            { identifier: "welcome", day: "so", time: 14, duration: 4 },
          ],
        }),
      500
    )
  );
};
