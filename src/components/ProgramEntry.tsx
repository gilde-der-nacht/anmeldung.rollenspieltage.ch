import {
  GameMaster,
  Identifier,
  Participate,
  ProgramEntry,
  Workshop,
} from "@util/AppState";
import { renderNamesList } from "@util/utils";
import { Component } from "solid-js";
import { ProgramEntryBase } from "./ProgrammEntryBase";

const NothingEntry: Component<ProgramEntry> = (props) => (
  <ProgramEntryBase
    {...props}
    color="gray"
    hint="Kein persönliches Programm. Zeit für spontane Spielrunden."
  />
);
const LunchEntry: Component<ProgramEntry> = (props) => (
  <ProgramEntryBase
    {...props}
    title="Verpflegungspause"
    hint="Am Mittag kochen wir etwas Leckeres für euch."
    icon="pot-food"
    color="gray"
  />
);
const DinnerEntry: Component<ProgramEntry> = (props) => (
  <ProgramEntryBase
    {...props}
    title="Verpflegungspause"
    hint="Am Abend kochen wir etwas Leckeres für euch."
    icon="pot-food"
    color="gray"
  />
);
const HelpingEntry: Component<ProgramEntry> = (props) => (
  <ProgramEntryBase
    {...props}
    title="Helfen am Kiosk"
    icon="user-helmet-safety"
  />
);
const WelcomeEntry: Component<ProgramEntry> = (props) => (
  <ProgramEntryBase
    {...props}
    title="Willkommenskomitee (OK)"
    icon="hand-wave"
  />
);
const GameMasterEntry: Component<ProgramEntry> = (props) => (
  <ProgramEntryBase
    {...props}
    title={(props as GameMaster).game.title}
    color="danger"
    icon="dice-d20"
    gameMaster={(props as GameMaster).game.gameMaster}
    participants={renderNamesList((props as GameMaster).game.players)}
    emptySeats={
      (props as Participate).game.maxPlayerCount -
      (props as Participate).game.players.length
    }
  />
);
const ParticipateEntry: Component<ProgramEntry> = (props) => (
  <ProgramEntryBase
    {...props}
    title={(props as Participate).game.title}
    color="success"
    icon="dice-d6"
    gameMaster={(props as Participate).game.gameMaster}
    participants={renderNamesList((props as Participate).game.players)}
  />
);
const WorkshopEntry: Component<ProgramEntry> = (props) => (
  <ProgramEntryBase
    {...props}
    title={(props as Workshop).game.title}
    color="success"
    icon="waveform-lines"
    gameMaster={(props as Workshop).game.gameMaster}
    participants={renderNamesList((props as Workshop).game.players)}
  />
);
const KitchenEntry: Component<ProgramEntry> = (props) => (
  <ProgramEntryBase {...props} title="Küche (OK)" icon="hat-chef" />
);

export const DynamicEntry: Record<
  Identifier,
  (props: ProgramEntry) => Component
> = {
  nothing: (props) => () => <NothingEntry {...props} />,
  lunch: (props) => () => <LunchEntry {...props} />,
  dinner: (props) => () => <DinnerEntry {...props} />,
  helping: (props) => () => <HelpingEntry {...props} />,
  welcome: (props) => () => <WelcomeEntry {...props} />,
  gameMaster: (props) => () => <GameMasterEntry {...props} />,
  participate: (props) => () => <ParticipateEntry {...props} />,
  workshop: (props) => () => <WorkshopEntry {...props} />,
  kitchen: (props) => () => <KitchenEntry {...props} />,
};
