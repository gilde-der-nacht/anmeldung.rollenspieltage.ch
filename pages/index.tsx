import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Checkbox } from "../components/form/Checkbox";
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

  type Slot = {
    state: boolean;
    label: string;
  };
  const timeSlots: Slot[] = [
    { state: timeSlotSaturday1, label: "Sa, 10-13" },
    { state: timeSlotSaturday2, label: "Sa, 13-16" },
    { state: timeSlotSaturday3, label: "Sa, 16-19" },
    { state: timeSlotSaturday4, label: "Sa, 19-22" },
    { state: timeSlotSunday1, label: "So, 10-13" },
    { state: timeSlotSunday2, label: "So, 13-16" },
    { state: timeSlotSunday3, label: "So, 16-18" },
  ];
  const hasNoSlots = timeSlots.filter((slot) => slot.state).length === 0;
  const timeProps = hasNoSlots
    ? {
        error: (
          <AlertBox link="/zeit">
            <p>Bitte wähle mindestens einen Slot aus.</p>
          </AlertBox>
        ),
      }
    : {};

  const [fantasy, setFantasy] = useLocalStorage("fantasy", false);
  const [scifi, setScifi] = useLocalStorage("scifi", false);
  const [horror, setHorror] = useLocalStorage("horror", false);
  const [crime, setCrime] = useLocalStorage("crime", false);
  const [modern, setModern] = useLocalStorage("modern", false);
  const [cyberpunk, setCyberpunk] = useLocalStorage("cyberpunk", false);
  const [steampunk, setSteampunk] = useLocalStorage("steampunk", false);
  const [western, setWestern] = useLocalStorage("western", false);
  const [history, setHistory] = useLocalStorage("history", false);
  const GENRE_LIST = [
    { state: fantasy, label: "Fantasy" },
    { state: scifi, label: "Science Fiction" },
    { state: horror, label: "Horror" },
    { state: crime, label: "Krimi" },
    { state: modern, label: "Modern" },
    {
      state: cyberpunk,
      label: "Cyberpunk",
    },
    {
      state: steampunk,
      label: "Steampunk",
    },
    { state: western, label: "Western" },
    { state: history, label: "Geschichte" },
  ];

  const hasNoGenre = GENRE_LIST.filter((genre) => genre.state).length === 0;
  const [likeToPlay, setLikeToPlay] = useLocalStorage("likeToPlay", true);
  const vorliebenProps =
    likeToPlay && hasNoGenre
      ? {
          error: (
            <AlertBox link="/mitspielen">
              <p>Bitte wähle mindestens ein Genre aus.</p>
            </AlertBox>
          ),
        }
      : {};
  const [likeToMaster, setLikeToMaster] = useLocalStorage(
    "likeToMaster",
    false
  );
  const gameMasterProps = likeToMaster
    ? {
        error: (
          <AlertBox link="/spielleiten">
            <p>Bitte wähle deine XYZ aus.</p>
          </AlertBox>
        ),
      }
    : {};

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
          <span> ({companions.length})</span>
        </>
      </Drawer>
      <Drawer title="Zeit" link="/zeit" {...timeProps}>
        <div>
          {timeSlots
            .filter((slot) => slot.state)
            .map((slot) => slot.label)
            .join(" / ")}
        </div>
      </Drawer>
      <h2>Spieler:innen</h2>
      <p>
        Möchtest du gerne Mitspielen, dann fülle die folgenden Informationen
        aus.
      </p>
      <div>
        <Checkbox state={likeToPlay} setter={setLikeToPlay}>
          <span>
            Ja, ich möchte gerne in einer oder mehreren Rollenspielrunden
            mitspielen.
          </span>
        </Checkbox>
      </div>
      <Drawer
        title="Vorlieben"
        link="/mitspielen"
        {...vorliebenProps}
        disabled={!likeToPlay}
      >
        <>
          <strong>
            {hasNoGenre
              ? "Kein Genre ausgewählt"
              : GENRE_LIST.filter((genre) => genre.state)
                  .map((genre) => genre.label)
                  .join(", ")}
          </strong>
          <span> ({GENRE_LIST.filter((genre) => genre.state).length})</span>
        </>
      </Drawer>
      <h2>Spielleiter:innen</h2>
      <p>
        Möchtest du ein oder mehrere Spielrunden leiten, dann erfasse diese in
        diesem Bereich.
      </p>
      <div>
        <Checkbox state={likeToMaster} setter={setLikeToMaster}>
          <span>
            Ja, ich möchte gerne eine oder mehrere Rollenspielrunden leiten.
          </span>
        </Checkbox>
      </div>
      <Drawer
        title="Spielrunden"
        link="/spielleiten"
        {...gameMasterProps}
        disabled={!likeToMaster}
      >
        <>
          <strong>
            {hasNoGenre ? "Kein Genre ausgewählt" : companions.join(", ")}
          </strong>
          <span> ({companions.length})</span>
        </>
      </Drawer>
    </>
  );
};

export default Home;
