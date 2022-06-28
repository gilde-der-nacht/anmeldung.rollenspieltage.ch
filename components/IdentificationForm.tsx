import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowIcon from "./general/ArrowIcon";
import { checkEmail, checkName } from "./general/store";
import Router from "next/router";

type FormProps = {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  initial: boolean;
};

export const IdentificationForm = ({
  name,
  email,
  setName,
  setEmail,
  initial,
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
    Router.push("/");
    // TODO: Send to backend
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="content">
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
        <button className="button button-success" type="submit">
          <ArrowIcon />
          {initial ? (
            <span> Anmeldung starten </span>
          ) : (
            <span> Speichern & Zurück </span>
          )}
        </button>
      </form>
    </>
  );
};
