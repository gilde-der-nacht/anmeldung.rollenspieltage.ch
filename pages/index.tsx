import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AlertBox } from "../components/general/AlertBox";
import { Drawer } from "../components/general/Drawer";
import { useLocalStorage } from "../components/general/store";

const Home: NextPage = () => {
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [companion1, setCompanion1] = useLocalStorage("companion1", "");
  const [companion2, setCompanion2] = useLocalStorage("companion2", "");
  const companions = [companion1, companion2].filter((c) => c.length > 0);
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
  const timeSlots = () => {
    const slots = [
      { state: timeSlotSaturday1, label: "Sa, 10-13" },
      { state: timeSlotSaturday2, label: "Sa, 13-16" },
      { state: timeSlotSaturday3, label: "Sa, 16-19" },
      { state: timeSlotSaturday4, label: "Sa, 20-22" },
      { state: timeSlotSunday1, label: "So, 10-13" },
      { state: timeSlotSunday2, label: "So, 13-16" },
      { state: timeSlotSunday3, label: "So, 16-18" },
    ];
    const hasNoSlots = slots.filter((slot) => slot.state).length === 0;

    if (hasNoSlots) {
      return (
        <AlertBox>
          <p>Bitte wähle mindestens einen Slot aus.</p>
        </AlertBox>
      );
    }

    return (
      <div>
        {slots
          .filter((slot) => slot.state)
          .map((slot) => slot.label)
          .join(" / ")}
      </div>
    );
  };

  return (
    <>
      <h1>Übersicht</h1>
      <Drawer title="Kontaktdaten" link="/kontaktdaten" type="success">
        <>
          Name: <strong>{name}</strong>
          <br /> E-Mail: <strong>{email}</strong>
        </>
      </Drawer>
      <Drawer title="Begleitung" link="/begleitung" optional={true}>
        <>
          <strong>
            {companions.length === 0
              ? "Ohne Begleitung"
              : companions.join(", ")}
          </strong>
          ({companions.length})
        </>
      </Drawer>
      <Drawer title="Zeit" link="/zeit">
        {timeSlots()}
      </Drawer>
    </>
  );
};

export default Home;
