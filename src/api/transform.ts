import { hasProp, ServerData, TimeEntry } from "@api/parse";
import { Game, ProgramEntry } from "@util/AppState";

export const transformName = (original: string): string => {
  if (original.includes("(via Marco)")) {
    return original.substring(0, original.indexOf("(") - 1);
  }
  return original;
};

export const transformBeforeEntry = (original: ServerData): ServerData => {
  const transformEntry = (entry: TimeEntry): TimeEntry => {
    if (entry.ts.entry.player !== null && entry.ts.entry.player.id === 17) {
      return {
        ts: {
          ...entry.ts,
          entry: {
            ...entry.ts.entry,
            player: {
              ...entry.ts.entry.player,
              players: [
                ...entry.ts.entry.player.players.filter(
                  (p) => p !== "Artur Kröll"
                ),
              ],
            },
          },
        },
      };
    }
    return entry;
  };

  return { ...original, timetable: original.timetable.map(transformEntry) };
};

export const transformAfterEntry = (original: ProgramEntry): ProgramEntry => {
  if (hasProp(original, "game")) {
    const game: Game =
      original.game === null
        ? original.game
        : {
            ...original.game,
            players: original.game.players.map(transformName),
            gameMaster: transformName(original.game.gameMaster),
          };
    if (game.id === 21) {
      game.title = "Dread";
    }
    if (game.id === 23) {
      game.title = "New Avanian Night";
    }
    if (game.id === 17) {
      game.players = game.players.filter((p) => p !== "Artur Kröll");
    }
    return { ...original, game };
  }
  return original;
};
