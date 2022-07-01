import { NextPage } from "next";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ButtonWithEvent } from "../components/form/ButtonWithEvent";
import { RadioButtons } from "../components/form/RadioButtons";
import { TextInput } from "../components/form/TextInput";
import {
  addGameRound,
  GameRound,
  getRandomId,
} from "../components/GameRoundStore";
import { AlertBox } from "../components/general/AlertBox";
import { useLocalStorage } from "../components/general/store";

const Spielleiten: NextPage = () => {
  const [gameRounds, setGameRounds] = useLocalStorage<GameRound[]>(
    "gameRounds",
    []
  );
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(120);
  const [minPlayerCount, setMinPlayerCount] = useState(3);
  const [maxPlayerCount, setMaxPlayerCount] = useState(4);
  const [repetition, setRepetition] = useState({
    name: "repetition",
    currentValue: 0,
    options: [
      {
        label: "einmalig",
        value: 0,
      },
      {
        label: "einmal pro Tag",
        value: 1,
      },
      {
        label: "gerne auch mehrmals",
        value: 2,
      },
    ],
  });

  const [errorWithName, setErrorWithName] = useState(false);
  const [errorWithDuration, setErrorWithDuration] = useState(false);
  const [errorWithPlayerCount, setErrorWithPlayerCount] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  useEffect(() => {
    setErrorWithName(name.trim().length < 1);
  }, [name]);

  useEffect(() => {
    setErrorWithDuration(duration < 15 || duration > 180);
  }, [duration]);

  useEffect(() => {
    setErrorWithPlayerCount(
      minPlayerCount < 0 || minPlayerCount > maxPlayerCount
    );
  }, [minPlayerCount, maxPlayerCount]);

  useEffect(() => {
    setGeneralError(false);
  }, [name, duration, minPlayerCount, maxPlayerCount]);

  const updateRepetitionValue = (num: number) => {
    console.log(num, "update");
    setRepetition((currVal) => {
      return { ...currVal, currentValue: num };
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name.trim().length < 1) {
      setGeneralError(true);
    }
    if (duration < 15) {
      setGeneralError(true);
    }
    if (duration > 180) {
      setGeneralError(true);
    }
    if (minPlayerCount < 0) {
      setGeneralError(true);
    }
    if (minPlayerCount > maxPlayerCount) {
      setGeneralError(true);
    }
    if (generalError) {
      return;
    }
    addGameRound(
      {
        id: getRandomId(),
        name: name.trim(),
        duration,
        minPlayerCount,
        maxPlayerCount,
        repetition: repetition.currentValue,
        active: true,
      },
      setGameRounds
    );

    Router.push("/");
  };

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
      <form onSubmit={handleSubmit} className="content">
        <TextInput
          state={name}
          setter={setName}
          label="Name der Spielrunde"
          placeholder="Name der Spielrunde"
          clue="z.B. Name des Abenteuers, Name des Spielsystems"
        />
        {errorWithName && (
          <div>
            <AlertBox>
              <p>Wähle bitte gültige Namen für die Spielrunde.</p>
            </AlertBox>
          </div>
        )}
        <TextInput
          state={duration}
          setter={(val) => setDuration(parseInt(val))}
          type="number"
          label="Dauer der Spielrunde in Minuten"
          placeholder="Dauer der Spielrunde"
          clue="max. 3 Stunden, resp. 180 Minuten"
        />
        {errorWithDuration && (
          <div>
            <AlertBox>
              <p>
                Wähle bitte eine gültige Minutenanzahl für die Spielrunde
                (mindestens 15 Minuten und maximal 3 Stunden).
              </p>
            </AlertBox>
          </div>
        )}
        <TextInput
          state={minPlayerCount}
          setter={(val) => setMinPlayerCount(parseInt(val))}
          type="number"
          label="Minimale Spieleranzahl"
          placeholder="Minimale Spieleranzahl"
        />
        {errorWithPlayerCount && (
          <div>
            <AlertBox>
              <p>Wähle bitte gültige Zahlen für die Spieleranzahl aus.</p>
            </AlertBox>
          </div>
        )}
        <TextInput
          state={maxPlayerCount}
          setter={(val) => setMaxPlayerCount(parseInt(val))}
          type="number"
          label="Maximale Spieleranzahl"
          placeholder="Maximale Spieleranzahl"
        />
        <h5>Repetition</h5>
        <p>Wie oft bist du bereit diese Runde durchzuführen?</p>
        <RadioButtons state={repetition} setter={updateRepetitionValue} />
        {generalError && (
          <div>
            <AlertBox>
              <p>
                Leider ist die Spielrunde nicht gültig. Überprüfe nochmals alle
                Felder.
              </p>
            </AlertBox>
          </div>
        )}
        <ButtonWithEvent isSubmit={true}>
          <span> Neue Spielrunde erstellen </span>
        </ButtonWithEvent>
      </form>
    </>
  );
};

export default Spielleiten;
