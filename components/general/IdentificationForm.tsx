import { useEffect, useState } from "react";
import ArrowSymbol from "../arrowSymbol";
import { checkEmail, checkIdentification, checkName } from "./store";

type FormProps = {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
};

export const IdentificationForm = ({
  name,
  email,
  setName,
  setEmail,
}: FormProps) => {
  const [localName, setLocalName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localNameHasErrors, setLocalNameHasErrors] = useState(false);
  const [localEmailHasErrors, setLocalEmailHasErrors] = useState(false);

  useEffect(() => {
    setLocalName(name);
    setLocalEmail(email);
  }, []);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLocalNameHasErrors(!checkName(localName));
    setLocalEmailHasErrors(!checkEmail(localEmail));
    if (localNameHasErrors || localEmailHasErrors) {
      return;
    }
    setName(localName.trim());
    setEmail(localEmail);
  }

  return (
    <>
      <h1>Anmeldung Luzerner Rollenspieltage 2022</h1>
      <p>
        Melde dich hier für die Rollenspieltage an, damit wir dir ein
        personalisiertes Programm zusenden können.
      </p>
      <p>
        Hast du Fragen oder tretten Probleme auf, dann nimm bitte mit uns{" "}
        <a href="https://rollenspieltage.ch/kontakt/">Kontakt</a> auf.
      </p>
      <h2>Kontaktdaten</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            required
          />
          {localNameHasErrors && (
            <small style={{ color: "var(--clr-danger-10)" }}>
              Bitte einen gültigen Namen eingeben.
            </small>
          )}
        </label>
        <label>
          E-Mail
          <input
            id="email"
            type="email"
            name="email"
            placeholder="E-Mail"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            required
          />
          {localEmailHasErrors && (
            <small style={{ color: "var(--clr-danger-10)" }}>
              Bitte eine gültige E-Mail-Adresse eingeben.
            </small>
          )}
        </label>
        <button className="button-accent" type="submit">
          <ArrowSymbol />
          {checkIdentification(name, email) ? (
            <span> Speichern </span>
          ) : (
            <span> Anmeldung starten </span>
          )}
        </button>
      </form>
    </>
  );
};
