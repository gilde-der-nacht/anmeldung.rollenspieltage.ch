import { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ButtonWithLink } from "../components/form/ButtonWithLink";
import { Checkbox } from "../components/form/Checkbox";
import { AlertBox } from "../components/general/AlertBox";
import { getSecretQuery } from "../components/general/server";
import { useLocalStorage } from "../components/general/store";

const Begleitung: NextPage = () => {
  const [secret, setSecret] = useLocalStorage("secret", "");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sec = queryParams.get("secret") || secret;
    setSecret(sec);
  }, [secret, setSecret]);
  const [timeSlotSaturday1, setTimeSlotSaturday1] = useLocalStorage(
    "timeSlotSaturday1",
    false
  );
  const [timeSlotSaturday2, setTimeSlotSaturday2] = useLocalStorage(
    "timeSlotSaturday2",
    false
  );
  const [timeSlotSaturday3, setTimeSlotSaturday3] = useLocalStorage(
    "timeSlotSaturday3",
    false
  );
  const [timeSlotSaturday4, setTimeSlotSaturday4] = useLocalStorage(
    "timeSlotSaturday4",
    false
  );
  const [timeSlotSunday1, setTimeSlotSunday1] = useLocalStorage(
    "timeSlotSunday1",
    false
  );
  const [timeSlotSunday2, setTimeSlotSunday2] = useLocalStorage(
    "timeSlotSunday2",
    false
  );
  const [timeSlotSunday3, setTimeSlotSunday3] = useLocalStorage(
    "timeSlotSunday3",
    false
  );
  type Slot = {
    state: boolean;
    setter: Dispatch<SetStateAction<boolean>>;
    label: JSX.Element;
  };
  const timeSlotsSa: Slot[] = [
    {
      state: timeSlotSaturday1,
      setter: setTimeSlotSaturday1,
      label: (
        <span>
          10 bis 13 Uhr
          <small style={{ fontWeight: "normal", paddingLeft: "1rem" }}>
            (Mittagessen um 12 Uhr)
          </small>
        </span>
      ),
    },
    {
      state: timeSlotSaturday2,
      setter: setTimeSlotSaturday2,
      label: <span>13 bis 16 Uhr</span>,
    },
    {
      state: timeSlotSaturday3,
      setter: setTimeSlotSaturday3,
      label: (
        <span>
          16 bis 19 Uhr
          <small style={{ fontWeight: "normal", paddingLeft: "1rem" }}>
            (Nachtessen um 18 Uhr)
          </small>
        </span>
      ),
    },
    {
      state: timeSlotSaturday4,
      setter: setTimeSlotSaturday4,
      label: <span>19 bis 22 Uhr</span>,
    },
  ];

  const timeSlotsSo: Slot[] = [
    {
      state: timeSlotSunday1,
      setter: setTimeSlotSunday1,
      label: (
        <span>
          10 bis 13 Uhr
          <small style={{ fontWeight: "normal", paddingLeft: "1rem" }}>
            (Mittagessen um 12 Uhr)
          </small>
        </span>
      ),
    },
    {
      state: timeSlotSunday2,
      setter: setTimeSlotSunday2,
      label: <span>13 bis 16 Uhr</span>,
    },
    {
      state: timeSlotSunday3,
      setter: setTimeSlotSunday3,
      label: <span>16 bis 18 Uhr</span>,
    },
  ];

  const [noSlotsSelected, setNoSlotsSelected] = useState(true);

  useEffect(() => {
    const hasNoSlots =
      [
        timeSlotSaturday1,
        timeSlotSaturday2,
        timeSlotSaturday3,
        timeSlotSaturday4,
        timeSlotSunday1,
        timeSlotSunday2,
        timeSlotSunday3,
      ].filter((slot) => slot).length === 0;
    setNoSlotsSelected(hasNoSlots);
  }, [
    timeSlotSaturday1,
    timeSlotSaturday2,
    timeSlotSaturday3,
    timeSlotSaturday4,
    timeSlotSunday1,
    timeSlotSunday2,
    timeSlotSunday3,
  ]);

  return (
    <>
      <h1>Zeit</h1>
      <p>
        Bitte wähle aus, zu welchen Tageszeiten du an den Rollenspieltagen
        teilnehmen wirst.
      </p>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}
        className="content"
      >
        {noSlotsSelected && (
          <AlertBox>
            <p>Bitte wähle mindestens einen Slot aus.</p>
          </AlertBox>
        )}
        <h2>Samstag, 27. August</h2>
        <ul role="list" className="checkbox-list">
          {timeSlotsSa.map((slot, i) => (
            <li key={i}>
              <Checkbox state={slot.state} setter={slot.setter}>
                {slot.label}
              </Checkbox>
            </li>
          ))}
        </ul>
        <h2>Sonntag, 28. August</h2>
        <ul role="list" className="checkbox-list">
          {timeSlotsSo.map((slot, i) => (
            <li key={i}>
              <Checkbox state={slot.state} setter={slot.setter}>
                {slot.label}
              </Checkbox>
            </li>
          ))}
        </ul>
        {noSlotsSelected && (
          <AlertBox>
            <p>Bitte wähle mindestens einen Slot aus.</p>
          </AlertBox>
        )}
        <ButtonWithLink link={"/" + getSecretQuery(secret)} type="success" saveOnClick={true}>
          <span> Speichern & Zurück </span>
        </ButtonWithLink>
      </form>
    </>
  );
};

export default Begleitung;
