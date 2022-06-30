import { NextPage } from "next";
import { ButtonWithLink } from "../components/form/ButtonWithLink";
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
        <ButtonWithLink link="/neue-spielrunde" type="success">
          <span> Neue Spielrunde </span>
        </ButtonWithLink>
      </div>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}
        className="content"
      >
        <div>
          <ButtonWithLink link="/" type="success">
            <span> Speichern & Zurück </span>
          </ButtonWithLink>
        </div>
      </form>
    </>
  );
};

export default Spielleiten;
