import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Checkbox } from "../components/form/Checkbox";
import { TextInput } from "../components/form/TextInput";
import { AlertBox } from "../components/general/AlertBox";
import ArrowIcon from "../components/icons/ArrowIcon";
import { useLocalStorage } from "../components/general/store";

const Spielleiten: NextPage = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(120);
  const [minPlayerCount, setMinPlayerCount] = useState(3);
  const [maxPlayerCount, setMaxPlayerCount] = useState(4);
  const [repetition, setRepetition] = useState(0);

  return (
    <>
      <h1>Spielleiter:innen: Neue Spielrunde</h1>
      <p>Erfasse an dieser Stelle eine neue Spielrunde.</p>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}
        className="content"
      >
        <TextInput
          state={name}
          setter={setName}
          label="Name der Spielrunde"
          placeholder="Name der Spielrunde"
          clue="z.B. Name des Abenteuers, Name des Spielsystems"
        />
        <TextInput
          state={duration}
          setter={(val) => setDuration(parseInt(val))}
          type="number"
          label="Dauer der Spielrunde in Minuten"
          placeholder="Dauer der Spielrunde"
          clue="max. 3 Stunden, resp. 180 Minuten"
        />
        <TextInput
          state={minPlayerCount}
          setter={(val) => setMinPlayerCount(parseInt(val))}
          type="number"
          label="Minimale Spieleranzahl"
          placeholder="Minimale Spieleranzahl"
        />
        <TextInput
          state={maxPlayerCount}
          setter={(val) => setMaxPlayerCount(parseInt(val))}
          type="number"
          label="Maximale Spieleranzahl"
          placeholder="Maximale Spieleranzahl"
        />
        <div>
          <button className="button button-success">
            <ArrowIcon />
            <span> Neue Spielrunde erstellen </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default Spielleiten;
