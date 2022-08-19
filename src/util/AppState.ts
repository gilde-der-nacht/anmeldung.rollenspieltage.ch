export type Identifier =
  | "nothing"
  | "lunch"
  | "dinner"
  | "helping"
  | "welcome"
  | "gameMaster"
  | "participate"
  | "workshop";

type Game = {
  title: string;
};

type DAY = "sa" | "so";
type HOUR = 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

type Nothing = { identifier: "nothing" };
type Lunch = { identifier: "lunch" };
type Dinner = { identifier: "dinner" };
type Helping = { identifier: "helping" };
type Welcome = { identifier: "welcome" };
type GameMaster = { identifier: "gameMaster"; game: Game };
type Participate = { identifier: "participate"; game: Game };
type Workshop = { identifier: "workshop"; game: Game };

export type ProgramEntry = { time: HOUR; day: DAY; duration: number } & (
  | Nothing
  | Lunch
  | Dinner
  | Helping
  | Welcome
  | GameMaster
  | Participate
  | Workshop
);

export type AppState = { program: ProgramEntry[]; names: string[] };
