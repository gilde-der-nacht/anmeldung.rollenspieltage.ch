import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Checkbox } from "../components/form/Checkbox";
import { AlertBox } from "../components/general/AlertBox";
import ArrowIcon from "../components/icons/ArrowIcon";
import { useLocalStorage } from "../components/general/store";

const Spielleiten: NextPage = () => {
  const [gameRounds, setGameRounds] = useLocalStorage("gameRounds", []);

  return (
    <>
      <h1>Spielleiter:innen: Deine Spielrunden</h1>
      <p>Erfasse an dieser Stelle deine Spielrunden.</p>
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
      <div>
        <Link href="/neue-spielrunde">
          <a className="button button-success">
            <ArrowIcon />
            <span> Neue Spielrunde </span>
          </a>
        </Link>
      </div>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}
        className="content"
      >
        <div>
          <Link href="/">
            <a className="button button-success">
              <ArrowIcon />
              <span> Speichern & Zurück </span>
            </a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Spielleiten;
