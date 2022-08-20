import { AppState, ProgramEntry } from "@util/AppState";
import { ServerData } from "@api/parse";

export const aggregateData = (serverData: ServerData): AppState => {
  const programSeparated: ProgramEntry[] = serverData.timetable
    .map((ts) => ts.ts)
    .map((ts): ProgramEntry => {
      if (ts.entry.kiosk) {
        return {
          day: ts.day,
          time: ts.hour,
          identifier: "helping",
          duration: 1,
        };
      }
      if (ts.entry.kueche) {
        return {
          day: ts.day,
          time: ts.hour,
          identifier: "kitchen",
          duration: 1,
        };
      }
      if (ts.entry.ok) {
        return {
          day: ts.day,
          time: ts.hour,
          identifier: "welcome",
          duration: 1,
        };
      }
      if (ts.entry.gamemaster !== null) {
        const { gamemaster: game } = ts.entry;
        return {
          day: ts.day,
          time: ts.hour,
          identifier: "gameMaster",
          duration: 1,
          game: {
            gameMaster: game.game_master,
            maxPlayerCount: game.max_players,
            players: game.players,
            title: game.name,
            id: game.id,
            isContinuation: false,
          },
        };
      }
      if (ts.entry.player !== null) {
        const { player: game } = ts.entry;
        return {
          day: ts.day,
          time: ts.hour,
          identifier: "participate",
          duration: 1,
          game: {
            gameMaster: game.game_master,
            maxPlayerCount: game.max_players,
            players: game.players,
            title: game.name,
            id: game.id,
            isContinuation: false,
          },
        };
      }
      if (ts.hour === 12) {
        return {
          day: ts.day,
          time: ts.hour,
          identifier: "lunch",
          duration: 1,
        };
      }
      if (ts.hour === 18) {
        return {
          day: ts.day,
          time: ts.hour,
          identifier: "dinner",
          duration: 1,
        };
      }
      return { day: ts.day, time: ts.hour, identifier: "nothing", duration: 1 };
    });
  const programGrouped: ProgramEntry[] = [];
  const gameIds = new Set<number>();
  let lastEntry: ProgramEntry | null = null;
  programSeparated.forEach((p) => {
    if (lastEntry === null) {
      lastEntry = p;
      return;
    }
    if (lastEntry.identifier === p.identifier && lastEntry.day === p.day) {
      if (
        lastEntry.identifier === "gameMaster" &&
        p.identifier === "gameMaster"
      ) {
        if (lastEntry.game.id === p.game.id) {
          lastEntry = { ...lastEntry, duration: lastEntry.duration + 1 };
          return;
        }
      } else if (
        lastEntry.identifier === "participate" &&
        p.identifier === "participate"
      ) {
        if (lastEntry.game.id === p.game.id) {
          lastEntry = { ...lastEntry, duration: lastEntry.duration + 1 };
          return;
        }
      } else {
        lastEntry = { ...lastEntry, duration: lastEntry.duration + 1 };
        return;
      }
    }
    programGrouped.push(lastEntry);
    if (
      lastEntry.identifier === "gameMaster" ||
      lastEntry.identifier === "participate"
    ) {
      gameIds.add(lastEntry.game.id);
    }
    if (
      (p.identifier === "gameMaster" || p.identifier === "participate") &&
      gameIds.has(p.game.id)
    ) {
      lastEntry = { ...p, game: { ...p.game, isContinuation: true } };
    } else {
      lastEntry = p;
    }
  });
  if (lastEntry !== null) {
    programGrouped.push(lastEntry);
  }
  return {
    names: [serverData.name, ...serverData.companions],
    program: programGrouped,
    hasLoaded: true,
  };
};
