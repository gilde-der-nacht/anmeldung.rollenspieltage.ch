import { AppState } from "@util/AppState";

export const getServerData = async (): Promise<AppState> => {
  return await new Promise((res, rej) =>
    setTimeout(
      () =>
        res({
          hasLoaded: true,
          names: ["Oliver Bucher"],
          program: [
            { identifier: "nothing", day: "sa", time: 10, duration: 2 },
            { identifier: "lunch", day: "sa", time: 12, duration: 1 },
            { identifier: "nothing", day: "sa", time: 13, duration: 3 },
            {
              identifier: "gameMaster",
              day: "sa",
              time: 16,
              duration: 1,
              game: {
                title: "Lasers and Feelings",
                gameMaster: "Oliver Bucher",
                players: [
                  "Mario Anoniutti",
                  "Renato Carlotti",
                  "Diego Pfister",
                ],
                maxPlayerCount: 4,
              },
            },
            {
              identifier: "gameMaster",
              day: "sa",
              time: 17,
              duration: 1,
              game: {
                title: "Ironsworn",
                gameMaster: "Oliver Bucher",
                players: ["Michael", "Alex Weidmann", "Daniel Bucher"],
                maxPlayerCount: 4,
              },
            },
            { identifier: "dinner", day: "sa", time: 18, duration: 1 },
            {
              identifier: "gameMaster",
              day: "sa",
              time: 19,
              duration: 1,
              game: {
                title: "Ironsworn",
                gameMaster: "Oliver Bucher",
                players: ["Michael", "Alex Weidmann", "Daniel Bucher"],
                maxPlayerCount: 4,
              },
            },
            {
              identifier: "gameMaster",
              day: "sa",
              time: 20,
              duration: 1,
              game: {
                title: "Microscope",
                gameMaster: "Oliver Bucher",
                players: [
                  "Michael",
                  "Alejandro Jimenez",
                  "Ralf",
                  "Daniel Bucher",
                ],
                maxPlayerCount: 5,
              },
            },
            { identifier: "welcome", day: "sa", time: 21, duration: 1 },
            {
              identifier: "gameMaster",
              day: "so",
              time: 10,
              duration: 1,
              game: {
                title: "Microscope",
                gameMaster: "Oliver Bucher",
                players: [
                  "Christian Hauk",
                  "Sebastiaan Pols",
                  "Dario Carelli",
                  "Marie-luise",
                ],
                maxPlayerCount: 5,
              },
            },
            {
              identifier: "gameMaster",
              day: "so",
              time: 11,
              duration: 1,
              game: {
                title: "Lasers and Feelings",
                gameMaster: "Oliver Bucher",
                players: ["Clemens", "Sebastiaan Pols", "Marie-luise"],
                maxPlayerCount: 4,
              },
            },
            { identifier: "lunch", day: "so", time: 12, duration: 1 },
            { identifier: "welcome", day: "so", time: 13, duration: 2 },
            {
              identifier: "gameMaster",
              day: "so",
              time: 15,
              duration: 2,
              game: {
                title: "Ironsworn",
                gameMaster: "Oliver Bucher",
                players: ["Michael", "Alex Weidmann", "Daniel Bucher"],
                maxPlayerCount: 4,
              },
            },
            { identifier: "welcome", day: "so", time: 17, duration: 1 },
          ],
        }),
      500
    )
  );
};
