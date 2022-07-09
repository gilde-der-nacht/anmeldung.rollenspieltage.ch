import { NextPage } from "next";
import { GameRoundEdit } from "../components/GameRoundEdit";
import {
  addGameRound,
  GameRound,
  getRandomId
} from "../components/GameRoundStore";
import { useLocalStorage } from "../components/general/store";

const Spielleiten: NextPage = () => {
  const [gameRounds, setGameRounds] = useLocalStorage<GameRound[]>(
    "gameRounds",
    []
  );

  return (
    <>
      <h1>Spielleiter:innen: Neue Spielrunde</h1>
      <p>Erfasse an dieser Stelle eine neue Spielrunde.</p>
      <p>
        Du solltest keine Voraussetzung an deine Mitspielern stellen und den
        Einstieg so einfach wie möglich halten. Gehe davon aus, dass die Spieler
        noch nie von deinem Spielsystem gehört haben.
      </p>
      <p>
        Wir möchten dich darauf hinweisen, dass du bitte systemspezifisches
        Spielmaterial für deine Spieler:innen mitnimmst. Für Schreibzeug sorgen
        wir.
      </p>
      <GameRoundEdit
        gameRound={{
          id: getRandomId(),
          name: "",
          duration: 120,
          minPlayerCount: 3,
          maxPlayerCount: 4,
          repetition: 0,
          active: true,
        }}
        onSubmit={(gameRound) => addGameRound(gameRound, setGameRounds)}
      />
    </>
  );
};

export default Spielleiten;
