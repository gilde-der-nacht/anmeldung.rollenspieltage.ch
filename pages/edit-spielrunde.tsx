import { NextPage } from "next";
import { useEffect, useState } from "react";
import { GameRoundEdit } from "../components/GameRoundEdit";
import {
  GameRound,
  getGameRoundById,
  updateGameRound,
} from "../components/GameRoundStore";
import { AlertBox } from "../components/general/AlertBox";
import { saveToServer } from "../components/general/server";
import { useLocalStorage } from "../components/general/store";

const SpielrundeAnpassen: NextPage = () => {
  const [gameRounds, setGameRounds] = useLocalStorage<GameRound[]>(
    "gameRounds",
    []
  );
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret]);

  const [gameRound, setGameRound] = useState<GameRound>({
    id: "",
    name: "",
    duration: 0,
    minPlayerCount: 0,
    maxPlayerCount: 0,
    repetition: 0,
    active: true,
  });

  const [gameRoundNotFoundError, setGameRoundNotFoundError] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    setGameRoundNotFoundError(typeof id !== "string");
    if (typeof id !== "string") {
      return;
    }
    const gr = getGameRoundById(id, gameRounds);
    setGameRoundNotFoundError(typeof gr === "undefined");
    if (typeof gr === "undefined") {
      return;
    }
    setGameRound((curr) => {
      return { ...curr, ...gr };
    });
  }, [gameRounds]);
  const [recentlySaved, setRecentlySaved] = useLocalStorage(
    "setRecentlySaved",
    false
  );

  return (
    <>
      <h1>Spielleiter:innen: Spielrunde anpasssen</h1>
      {gameRoundNotFoundError ? (
        <AlertBox link="https://rollenspieltage.ch/kontakt/">
          <p>
            Leider konnte keine Spielrunde gefunden werden. Wende dich bitte an
            uns, solltest du Probleme haben, deine Spielrunden anzupassen.
          </p>
        </AlertBox>
      ) : (
        <GameRoundEdit
          gameRound={gameRound}
          onSubmit={(gameRound) => {
            updateGameRound(gameRound, setGameRounds);
            saveToServer(secret);
            setRecentlySaved(false);
          }}
          onDelete={(gameRound) => {
            updateGameRound({ ...gameRound, active: false }, setGameRounds);
            saveToServer(secret);
            setRecentlySaved(false);
          }}
        />
      )}
    </>
  );
};

export default SpielrundeAnpassen;
