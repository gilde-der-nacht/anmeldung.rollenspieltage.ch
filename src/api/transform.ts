import { hasProp, ServerData, TimeEntry } from "@api/parse";
import { Game, ProgramEntry } from "@util/AppState";

export const transformName = (original: string): string => {
  if (original.includes("(via Marco)")) {
    return original.substring(0, original.indexOf("(") - 1);
  }
  return original;
};

const removePlayerFromGame =
  (currentPerson: string, gameId: number, removeThisPlayer: string) =>
  (e: TimeEntry): TimeEntry => {
    const { ts } = e;
    const { entry } = ts;
    if (entry.player === null && entry.gamemaster === null) {
      return e;
    } else if (entry.player !== null && entry.player.id === gameId) {
      if (currentPerson === removeThisPlayer) {
        return {
          ts: {
            ...ts,
            entry: {
              ...entry,
              player: null,
            },
          },
        };
      } else {
        const { player: game } = entry;
        const { players } = game;
        return {
          ts: {
            ...ts,
            entry: {
              ...entry,
              player: {
                ...game,
                players: [...players.filter((p) => p !== removeThisPlayer)],
              },
            },
          },
        };
      }
    } else if (entry.gamemaster !== null && entry.gamemaster.id) {
      const { gamemaster: game } = entry;
      const { players } = game;
      return {
        ts: {
          ...ts,
          entry: {
            ...entry,
            gamemaster: {
              ...game,
              players: [...players.filter((p) => p !== removeThisPlayer)],
            },
          },
        },
      };
    }
    return e;
  };

export const transformBeforeEntry = (original: ServerData): ServerData => {
  return {
    ...original,
    timetable: original.timetable
      .map(removePlayerFromGame(original.name, 17, "Artur Kröll"))
      .map(removePlayerFromGame(original.name, 4, "Deniz Aras"))
      .map(removePlayerFromGame(original.name, 12, "Deniz Aras")),
  };
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
    return { ...original, game };
  }
  return original;
};
