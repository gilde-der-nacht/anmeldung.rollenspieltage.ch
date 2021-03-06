import Router from "next/router";
import { useEffect, useState } from "react";
import { ButtonWithEvent } from "./form/ButtonWithEvent";
import { RadioButtons } from "./form/RadioButtons";
import { TextInput } from "./form/TextInput";
import { GameRound } from "./GameRoundStore";
import { AlertBox } from "./general/AlertBox";
import { getSecretQuery } from "./general/server";
import { useLocalStorage } from "./general/store";
import DeleteIcon from "./icons/DeleteIcon";

type FormProps = {
  gameRound: GameRound;
  onSubmit: (gameRound: GameRound) => void;
  onDelete?: (gameRound: GameRound) => void;
};

export const GameRoundEdit = ({ gameRound, onSubmit, onDelete }: FormProps) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(120);
  const [minPlayerCount, setMinPlayerCount] = useState(3);
  const [maxPlayerCount, setMaxPlayerCount] = useState(4);
  const [repetition, setRepetition] = useState({
    name: "repetition",
    currentValue: 0,
    options: [
      {
        label: (
          <span>
            einmalig
            <small style={{ fontWeight: "normal", paddingLeft: "1rem" }}>
              (Samstag ODER Sonntag)
            </small>
          </span>
        ),
        value: 0,
      },
      {
        label: (
          <span>
            einmal pro Tag
            <small style={{ fontWeight: "normal", paddingLeft: "1rem" }}>
              (Samstag UND Sonntag)
            </small>
          </span>
        ),
        value: 1,
      },
      {
        label: <span>gerne auch mehrmals</span>,
        value: 2,
      },
    ],
  });
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret, setSecret]);

  useEffect(() => {
    setId(gameRound.id);
    setName(gameRound.name);
    setDuration(gameRound.duration);
    setMinPlayerCount(gameRound.minPlayerCount);
    setMaxPlayerCount(gameRound.maxPlayerCount);
    updateRepetitionValue(gameRound.repetition);
  }, [gameRound]);

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
    setRepetition((currVal) => {
      return { ...currVal, currentValue: num };
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name.trim().length < 1) {
      setGeneralError(true);
      return;
    }
    if (duration < 15) {
      setGeneralError(true);
      return;
    }
    if (duration > 180) {
      setGeneralError(true);
      return;
    }
    if (minPlayerCount < 0) {
      setGeneralError(true);
      return;
    }
    if (minPlayerCount > maxPlayerCount) {
      setGeneralError(true);
      return;
    }
    onSubmit({
      id,
      name: name.trim(),
      duration,
      minPlayerCount,
      maxPlayerCount,
      repetition: repetition.currentValue,
      active: true,
    });

    Router.push("/" + getSecretQuery(secret));
  };

  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (typeof onDelete === "undefined") {
      return;
    }
    onDelete({
      id,
      name: name.trim(),
      duration,
      minPlayerCount,
      maxPlayerCount,
      repetition: repetition.currentValue,
      active: false,
    });
    Router.push("/" + getSecretQuery(secret));
  };

  return (
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
            <p>W??hle bitte g??ltige Namen f??r die Spielrunde.</p>
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
              W??hle bitte eine g??ltige Minutenanzahl f??r die Spielrunde
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
            <p>W??hle bitte g??ltige Zahlen f??r die Spieleranzahl aus.</p>
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
      <p>Wie oft bist du bereit diese Runde durchzuf??hren?</p>
      <RadioButtons state={repetition} setter={updateRepetitionValue} />
      {generalError && (
        <div>
          <AlertBox>
            <p>
              Leider ist die Spielrunde nicht g??ltig. ??berpr??fe nochmals alle
              Felder.
            </p>
          </AlertBox>
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {typeof onDelete === "undefined" ? (
          <ButtonWithEvent isSubmit={true}>
            <span> Neue Spielrunde erstellen </span>
          </ButtonWithEvent>
        ) : (
          <>
            <ButtonWithEvent isSubmit={true}>
              <span> ??nderungen speichern </span>
            </ButtonWithEvent>
            <ButtonWithEvent
              event={handleDelete}
              icon={<DeleteIcon />}
              type="danger"
            >
              <span> Spielrunde l??schen </span>
            </ButtonWithEvent>
          </>
        )}
      </div>
    </form>
  );
};
