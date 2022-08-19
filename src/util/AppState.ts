type Game = {
  title: string;
};

type Nothing = { identifier: "nothing" };
type Lunch = { identifier: "lunch" };
type Dinner = { identifier: "dinner" };
type Helping = { identifier: "helping" };
type Welcome = { identifier: "welcome" };
type GameMaster = { identifier: "gameMaster"; game: Game };
type Participate = { identifier: "participate"; game: Game };
type Workshop = { identifier: "workshop"; game: Game };

type ProgramEntry = { time: number; day: number } & (
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
