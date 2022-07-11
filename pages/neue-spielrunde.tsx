import { NextPage } from "next";
import { useEffect } from "react";
import { GameRoundEdit } from "../components/GameRoundEdit";
import {
  addGameRound,
  GameRound,
  getRandomId,
} from "../components/GameRoundStore";
import { saveToServer } from "../components/general/server";
import { useLocalStorage } from "../components/general/store";

const Spielleiten: NextPage = () => {
  const [gameRounds, setGameRounds] = useLocalStorage<GameRound[]>(
    "gameRounds",
    []
  );
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret, setSecret]);

  const [recentlySaved, setRecentlySaved] = useLocalStorage(
    "recentlySaved",
    false
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
        onSubmit={(gameRound) => {
          addGameRound(gameRound, setGameRounds);
          setRecentlySaved(false);
          saveToServer(secret);
        }}
      />
    </>
  );
};

export default Spielleiten;
