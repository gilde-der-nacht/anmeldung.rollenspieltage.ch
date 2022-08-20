import { hasProp } from "@api/parse";
import { Game, ProgramEntry } from "@util/AppState";

export const transformName = (original: string): string => {
  if (original.includes("(via Marco)")) {
    return original.substring(0, original.indexOf("(") - 1);
  }
  return original;
};

export const transformEntry = (original: ProgramEntry): ProgramEntry => {
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
  return {
    ...original,
  };
};
