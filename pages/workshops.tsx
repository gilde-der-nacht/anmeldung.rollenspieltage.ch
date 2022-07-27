import { NextPage } from "next";
import { useEffect } from "react";
import { ButtonWithLink } from "../components/form/ButtonWithLink";
import { Checkbox } from "../components/form/Checkbox";
import { getSecretQuery } from "../components/general/server";
import { useLocalStorage } from "../components/general/store";

const Workshops: NextPage = () => {
  const [workshop1, setWorkshop1] = useLocalStorage("workshop1", false);
  const [workshop2, setWorkshop2] = useLocalStorage("workshop2", false);
  const [workshop3, setWorkshop3] = useLocalStorage("workshop3", false);
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret, setSecret]);

  return (
    <>
      <h1>Workshops</h1>
      <p>
        Unsere Workshops dienen dem Austausch zwischen allen Teilnehmer:innen
        der Luzerner Rollenspieltage.
      </p>
      <p>
        Du bist herzlich willkommen, egal ob du dich als Spieler:in,
        Spielleiter:in und/oder Helfer:in angemeldet hast.
        <strong> Rollenspielerfahrungen sind nicht notwendig.</strong>
      </p>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}
        className="content"
      >
        <h2>#1: Offene Fragerunde</h2>
        <p>
          Für Alle, egal ob Spieler:in oder Spielleiter:in, erfahren oder
          unerfahren. Beispiele für Fragen, die wir miteinander anschauen können:
        </p>
        <ul>
          <li>Meine Charaktere töten alles?</li>
          <li>Spieler-Charakter stirbt, was nun?</li>
          <li>Gruppe aufteilen?</li>
          <li>Meine Spieler:innen sind reicher als der König?</li>
          <li>
            Spieler:in würfelt: ... nichts passiert, würfelt einfach die nächste Person?
          </li>
        </ul>
        <p>Dauer: ca. 1 Stunde</p>
        <Checkbox state={workshop1} setter={setWorkshop1}>
          <span>Ja, ich habe Interesse am Workshop «Offene Fragerunde».</span>
        </Checkbox>

        <h2>#2: Warum spiele ich überhaupt Rollenspiele?</h2>
        <p>
          Selbsthilfegruppe für nicht ganz so anonyme Rollenspieler:innen. Alle
          willkommen, egal ob rechtschaffen böse, oder chaotisch gut.
        </p>
        <p>
          Wir schauen miteinander ein paar mehr oder wenige populäre
          Kategorisierungen von Spieler:innen-Typen an. Ziel wäre es, dass alle
          ein bisschen besser verstehen, was einem selber eigentlich Spass macht
          und auch was weniger.
        </p>
        <p>Dauer: ca. 45 Minuten</p>
        <Checkbox state={workshop2} setter={setWorkshop2}>
          <span>
            Ja, ich habe Interesse am Workshop «Warum spiele ich überhaupt
            Rollenspiele?».
          </span>
        </Checkbox>
        <h2>#3: Spielerischer Weltenbau</h2>
        <p>
          Aus einer Liste von Spielen wählen wir uns eines aus und spielen es
          gleich miteinander. In all diesen Spielen sind wir alle gemeinsam die
          Spielleitung.
        </p>
        <p>Dauer: ca. 90 Minuten</p>
        <Checkbox state={workshop3} setter={setWorkshop3}>
          <span>
            Ja, ich habe Interesse am Workshop «Spielerischer Weltenbau».
          </span>
        </Checkbox>
        <ButtonWithLink
          link={"/" + getSecretQuery(secret)}
          type="success"
          saveOnClick={true}
        >
          <span> Speichern & Zurück </span>
        </ButtonWithLink>
      </form>
    </>
  );
};

export default Workshops;
