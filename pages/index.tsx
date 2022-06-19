import type { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Layout from "../components/layout";
import IdentificationForm from "../components/identificationForm";
import CompanionsForm from "../components/companionsForm";

const PREFIX = "RST2020-";

const Home: NextPage = () => {
  // registration informations
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companion1, setCompanion1] = useState("");
  const [companion2, setCompanion2] = useState("");

  // UI helper
  const [registrationStarted, setRegistrationStarted] = useState(false);

  useEffect(() => {
    (
      [
        ["name", setName],
        ["email", setEmail],
        ["registrationStarted", setRegistrationStarted],
        ["companion1", setCompanion1],
        ["companion2", setCompanion2],
      ] as [string, Dispatch<SetStateAction<string | boolean>>][]
    ).forEach(([key, setter]) => getFromLocalstorage(key, setter));
  });

  const getFromLocalstorage = (
    key: string,
    setter: Dispatch<SetStateAction<string | boolean>>
  ) => {
    const value = localStorage.getItem(PREFIX + key);
    if (value) {
      setter(value);
    }
  };

  const updateState =
    <T extends string | boolean>(
      key: string,
      setter: Dispatch<SetStateAction<T>>
    ) =>
    (value: T) => {
      setter(value);
      localStorage.setItem(PREFIX + key, String(value));
    };

  const startRegistration = () => {
    updateState("registrationStarted", setRegistrationStarted)(true);
    // TODO: Already send identification info to server
  };

  return (
    <Layout>
      <h1>Anmeldung</h1>
      <IdentificationForm
        name={name}
        email={email}
        updateName={updateState("name", setName)}
        updateEmail={updateState("email", setEmail)}
        startRegistration={startRegistration}
        registrationStarted={registrationStarted}
      />
      {registrationStarted && (
        <CompanionsForm
          companion1={companion1}
          companion2={companion2}
          updateCompanion1={updateState("companion1", setCompanion1)}
          updateCompanion2={updateState("companion2", setCompanion2)}
        />
      )}
    </Layout>
  );
};

export default Home;
