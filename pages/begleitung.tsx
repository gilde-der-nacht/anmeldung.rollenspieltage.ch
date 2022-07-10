import { NextPage } from "next";
import { useEffect } from "react";
import { ButtonWithLink } from "../components/form/ButtonWithLink";
import { TextInput } from "../components/form/TextInput";
import { getSecretQuery } from "../components/general/server";
import { useLocalStorage } from "../components/general/store";

const Begleitung: NextPage = () => {
  const [companion1, setCompanion1] = useLocalStorage("companion1", "");
  const [companion2, setCompanion2] = useLocalStorage("companion2", "");
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret]);

  return (
    <>
      <h1>
        <span>Begleitung</span>{" "}
        <small style={{ color: "var(--clr-gray-8)" }}>(Optional)</small>
      </h1>
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
        className="content"
      >
        <TextInput
          state={companion1}
          setter={setCompanion1}
          label="Begleitung #1"
          placeholder="Begleitung #1"
        />
        <TextInput
          state={companion2}
          setter={setCompanion2}
          label="Begleitung #2"
          placeholder="Begleitung #2"
        />
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

export default Begleitung;
