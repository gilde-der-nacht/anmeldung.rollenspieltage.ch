export type Identifier =
  | "nothing"
  | "lunch"
  | "dinner"
  | "helping"
  | "welcome"
  | "gameMaster"
  | "participate"
  | "workshop"
  | "kitchen";

type Game = {
  title: string;
  gameMaster: string;
  players: string[];
  maxPlayerCount: number;
};

type DAY = "sa" | "so";
type HOUR = 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

export type Nothing = { identifier: "nothing" };
export type Lunch = { identifier: "lunch" };
export type Dinner = { identifier: "dinner" };
export type Helping = { identifier: "helping" };
export type Welcome = { identifier: "welcome" };
export type GameMaster = { identifier: "gameMaster"; game: Game };
export type Participate = { identifier: "participate"; game: Game };
export type Workshop = { identifier: "workshop"; game: Game };
export type Kitchen = { identifier: "kitchen" };

export type ProgramEntry = { time: HOUR; day: DAY; duration: number } & (
  | Nothing
  | Lunch
  | Dinner
  | Helping
  | Welcome
  | GameMaster
  | Participate
  | Workshop
  | Kitchen
);

export type AppState = { program: ProgramEntry[]; names: string[] };
