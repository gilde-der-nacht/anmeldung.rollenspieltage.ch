import type { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import IdentificationForm from "../components/identificationForm";
import CompanionsForm from "../components/companionsForm";
import TimetableForm from "../components/timetableForm";

const PREFIX = "RST2020-";

const Home: NextPage = () => {
  // registration informations
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companion1, setCompanion1] = useState("");
  const [companion2, setCompanion2] = useState("");
  const [timeSaturday, setTimeSaturday] = useState<number[]>([]);
  const [timeSunday, setTimeSunday] = useState<number[]>([]);

  // UI helper
  const [registrationStarted, setRegistrationStarted] = useState(false);
  const [openDrawer, setOpenDrawer] = useState("");

  useEffect(() => {
    [
      { key: "name", setter: setName },
      { key: "email", setter: setEmail },
      { key: "companion1", setter: setCompanion1 },
      { key: "companion2", setter: setCompanion2 },
    ].forEach(({ key, setter }) => {
      const value = localStorage.getItem(PREFIX + key);
      if (value) {
        setter(value);
      }
    });

    [
      {
        key: "registrationStarted",
        setter: setRegistrationStarted,
      },
    ].forEach(({ key, setter }) => {
      const value = localStorage.getItem(PREFIX + key);
      if (value) {
        setter(value === "true");
      }
    });

    [
      {
        key: "timeSaturday",
        setter: setTimeSaturday,
      },
      {
        key: "timeSunday",
        setter: setTimeSunday,
      },
    ].forEach(({ key, setter }) => {
      const value = localStorage.getItem(PREFIX + key);
      if (value) {
        setter(JSON.parse(value));
      }
    });
  });

  useEffect(() => {
    if (!registrationStarted) {
      setOpenDrawer("identification");
    } else if (openDrawer === "identification") {
      setOpenDrawer("");
    }
  }, [registrationStarted]);

  const updateState =
    <T extends string | boolean>(
      key: string,
      setter: Dispatch<SetStateAction<T>>
    ) =>
    (value: T) => {
      setter(value);
      localStorage.setItem(PREFIX + key, String(value));
    };

  const updateTimeState =
    (key: string, setter: Dispatch<SetStateAction<number[]>>) =>
    (value: number[]) => {
      setter(value);
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    };

  const startRegistration = () => {
    updateState("registrationStarted", setRegistrationStarted)(true);
    // TODO: Already send identification info to server
  };

  return (
    <>
      <h1>Anmeldung</h1>
      <IdentificationForm
        name={name}
        email={email}
        updateName={updateState("name", setName)}
        updateEmail={updateState("email", setEmail)}
        startRegistration={startRegistration}
        registrationStarted={registrationStarted}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      {registrationStarted && openDrawer !== "identification" && (
        <>
          <CompanionsForm
            companion1={companion1}
            companion2={companion2}
            updateCompanion1={updateState("companion1", setCompanion1)}
            updateCompanion2={updateState("companion2", setCompanion2)}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
          <TimetableForm
            timeSaturday={timeSaturday}
            updateTimeSaturday={updateTimeState(
              "timeSaturday",
              setTimeSaturday
            )}
            timeSunday={timeSunday}
            updateTimeSunday={updateTimeState("timeSunday", setTimeSunday)}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
          <hr />
          <h3>Spieler</h3>
          <h4>Bestätigung, gerne als Spieler anmelden</h4>
          <h4>Genre-Wünsche</h4>

          <hr />
          <h3>Spielleiter</h3>
          <h4>Bestätigung, gerne als Spielerleiter anmelden</h4>
          <h4>
            Spiele eintragen (System, Spieleranzahl (min/max), Dauer (15 Min bis
            3 Stunden), Kinderfreundlich)
          </h4>
          <hr />
          <h3>Verpflegung</h3>
          <h4>Ja/Nein/Vielleicht</h4>
          <h4>Allergien</h4>
          <hr />
          <h3>Helfen?</h3>
        </>
      )}
    </>
  );
};

export default Home;
