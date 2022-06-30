import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Checkbox } from "../components/form/Checkbox";
import { AlertBox } from "../components/general/AlertBox";
import ArrowIcon from "../components/icons/ArrowIcon";
import { useLocalStorage } from "../components/general/store";

const Mitspielen: NextPage = () => {
  const [fantasy, setFantasy] = useLocalStorage("fantasy", false);
  const [scifi, setScifi] = useLocalStorage("scifi", false);
  const [horror, setHorror] = useLocalStorage("horror", false);
  const [crime, setCrime] = useLocalStorage("crime", false);
  const [modern, setModern] = useLocalStorage("modern", false);
  const [cyberpunk, setCyberpunk] = useLocalStorage("cyberpunk", false);
  const [steampunk, setSteampunk] = useLocalStorage("steampunk", false);
  const [western, setWestern] = useLocalStorage("western", false);
  const [history, setHistory] = useLocalStorage("history", false);

  const GENRE_LIST = [
    { state: fantasy, setter: setFantasy, label: "Fantasy" },
    { state: scifi, setter: setScifi, label: "Science Fiction" },
    { state: horror, setter: setHorror, label: "Horror" },
    { state: crime, setter: setCrime, label: "Krimi" },
    { state: modern, setter: setModern, label: "Modern" },
    {
      state: cyberpunk,
      setter: setCyberpunk,
      label: "Cyberpunk",
    },
    {
      state: steampunk,
      setter: setSteampunk,
      label: "Steampunk",
    },
    { state: western, setter: setWestern, label: "Western" },
    { state: history, setter: setHistory, label: "Geschichte" },
  ];

  const [noGenreSelected, setNoGenreSelected] = useState(true);

  useEffect(() => {
    const hasNoGenre =
      [
        fantasy,
        scifi,
        horror,
        crime,
        modern,
        cyberpunk,
        steampunk,
        western,
        history,
      ].filter((genre) => genre).length === 0;
    setNoGenreSelected(hasNoGenre);
  }, [
    fantasy,
    scifi,
    horror,
    crime,
    modern,
    cyberpunk,
    steampunk,
    western,
    history,
  ]);

  return (
    <>
      <h1>Spieler:innen: Vorlieben</h1>
      <p>
        Welche der folgenden Genres findest du ansprechend? Wähle eines oder
        mehrere, damit wir dich in entsprechende Spielrunden einplanen können.
      </p>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}
        className="content"
      >
        {noGenreSelected && (
          <AlertBox>
            <p>Bitte wähle mindestens ein Genre aus.</p>
          </AlertBox>
        )}
        <ul role="list" className="checkbox-list">
          {GENRE_LIST.map((genre, i) => (
            <li key={i}>
              <Checkbox state={genre.state} setter={genre.setter}>
                <span>{genre.label}</span>
              </Checkbox>
            </li>
          ))}
        </ul>
        {noGenreSelected && (
          <AlertBox>
            <p>Bitte wähle mindestens ein Genre aus.</p>
          </AlertBox>
        )}
        <Link href="/">
          <a className="button button-success">
            <ArrowIcon />
            <span> Speichern & Zurück </span>
          </a>
        </Link>
      </form>
    </>
  );
};

export default Mitspielen;
