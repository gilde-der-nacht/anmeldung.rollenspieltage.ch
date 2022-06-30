import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import { checkEmail, checkName } from "./general/store";
import Router from "next/router";
import { TextInput } from "./form/TextInput";

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
        <TextInput
          state={localName}
          setter={setLocalName}
          label="Name"
          placeholder="Name"
          hasErrors={localNameHasErrors}
          errorText="Bitte einen gültigen Namen eingeben."
        />
        <TextInput
          state={localEmail}
          setter={setLocalEmail}
          type="email"
          label="E-Mail"
          placeholder="E-Mail"
          hasErrors={localEmailHasErrors}
          errorText="Bitte eine gültige E-Mail-Adresse eingeben."
        />
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
