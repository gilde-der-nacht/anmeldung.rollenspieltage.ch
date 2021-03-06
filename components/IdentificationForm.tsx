import Router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ButtonWithEvent } from "./form/ButtonWithEvent";
import { TextInput } from "./form/TextInput";
import { AlertBox } from "./general/AlertBox";
import { getSecretQuery, register, saveToServer } from "./general/server";
import { checkEmail, checkName, useLocalStorage } from "./general/store";

type FormProps = {
  name: string;
  email: string;
  setName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  initial: boolean;
};

export const IdentificationForm = ({
  name,
  email,
  setName,
  setEmail,
  initial,
}: FormProps) => {
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret, setSecret]);
  const [localName, setLocalName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localNameHasErrors, setLocalNameHasErrors] = useState(false);
  const [localEmailHasErrors, setLocalEmailHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNetworkError, setHasNetworkError] = useState(false);
  const [recentlySaved, setRecentlySaved] = useLocalStorage(
    "recentlySaved",
    false
  );

  useEffect(() => {
    setLocalName(name);
    setLocalEmail(email);
  }, []);

  function handleSubmit(e: React.SyntheticEvent) {
    setIsLoading(true);
    e.preventDefault();
    setLocalNameHasErrors(!checkName(localName));
    setLocalEmailHasErrors(!checkEmail(localEmail));
    if (localNameHasErrors || localEmailHasErrors) {
      setIsLoading(false);
      return;
    }

    if (!initial) {
      setIsLoading(false);
      setName(localName.trim());
      setEmail(localEmail);
      setRecentlySaved(false);
      saveToServer(secret);
      Router.push("/" + getSecretQuery(secret));
      return;
    }

    register(localName, localEmail)
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          setHasNetworkError(true);
          throw new Error(`${res.status}: ${res.statusText}`);
        }
      })
      .then((data) => {
        const sec: string = data["secret"];
        setSecret(data["secret"]);
        setName(localName.trim());
        setEmail(localEmail);
        Router.push("/" + getSecretQuery(sec));
      })
      .catch((err) => {
        setIsLoading(false);
        console.error({ err });
        setHasNetworkError(true);
      });
  }

  if (isLoading) {
    return (
      <AlertBox>
        <span>Bitte warten...</span>
      </AlertBox>
    );
  }

  return (
    <>
      {hasNetworkError && (
        <AlertBox>
          <span>
            Leider ist ein Fehler aufgetreten. Versuche es erneut. Sollte das
            Problem weiterhin bestehen,
            <a
              href="https://rollenspieltage.ch/kontakt/"
              target="_blank"
              rel="noreferrer"
            >
              bitten wir dich uns umgehend zu kontaktieren!
            </a>
          </span>
        </AlertBox>
      )}
      <form onSubmit={handleSubmit} className="content">
        <TextInput
          state={localName}
          setter={setLocalName}
          label="Name"
          placeholder="Name"
          hasErrors={localNameHasErrors}
          errorText="Bitte einen g??ltigen Namen eingeben."
        />
        <TextInput
          state={localEmail}
          setter={setLocalEmail}
          type="email"
          label="E-Mail"
          placeholder="E-Mail"
          hasErrors={localEmailHasErrors}
          errorText="Bitte eine g??ltige E-Mail-Adresse eingeben."
        />
        <ButtonWithEvent isSubmit={true}>
          {initial ? (
            <span> Anmeldung starten </span>
          ) : (
            <span> Speichern & Zur??ck </span>
          )}
        </ButtonWithEvent>
      </form>
    </>
  );
};
