import { NextPage } from "next";
import Link from "next/link";
import ArrowIcon from "../components/general/ArrowIcon";
import { useLocalStorage } from "../components/general/store";

const Begleitung: NextPage = () => {
  const [companion1, setCompanion1] = useLocalStorage("companion1", "");
  const [companion2, setCompanion2] = useLocalStorage("companion2", "");

  return (
    <>
      <h1>Begleitung <small style={{color: 'var(--clr-gray-8)'}}>(Optional)</small></h1>
      <p>
        Du kannst deine Anmeldung für bis zu zwei weitere Personen durchführen.
      </p>
      <p>
        <strong>
          Beachte, dass deine Begleitung das exakt selbe Programm enthält, wie
          du.
        </strong>
      </p>
      <p>
        Seid ihr mehr als drei Personen, teilt euch bitte in mehrere Gruppen
        (und somit mehrere Anmeldungen) auf.
      </p>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}
      >
        <label>
          Begleitung #1
          <input
            id="name1"
            type="text"
            name="name1"
            placeholder="Begleitung 1"
            value={companion1}
            onChange={(e) => setCompanion1(e.target.value)}
          />
        </label>
        <label>
          Begleitung #2
          <input
            id="name2"
            type="text"
            name="name2"
            placeholder="Begleitung 2"
            value={companion2}
            onChange={(e) => setCompanion2(e.target.value)}
          />
        </label>
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

export default Begleitung;
