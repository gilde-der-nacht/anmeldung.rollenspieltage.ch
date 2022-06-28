import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertBox } from "../components/general/AlertBox";
import AlertIcon from "../components/general/AlertIcon";
import ArrowIcon from "../components/general/ArrowIcon";
import { useLocalStorage } from "../components/general/store";

const Begleitung: NextPage = () => {
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

  const [noSlotsSelected, setNoSlotSelected] = useState(true);

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
    setNoSlotSelected(hasNoSlots);
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
      {noSlotsSelected && (
        <AlertBox>
          <p>Bitte wähle mindestens einen Slot aus.</p>
        </AlertBox>
      )}
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}
      >
        <h2>Samstag, 27. August</h2>
        <ul role="list" className="checkbox-list">
          <li>
            <label className="input-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setTimeSlotSaturday1(e.target.checked)}
                checked={timeSlotSaturday1}
              />
              10 bis 13 Uhr
            </label>
          </li>
          <li>
            <label className="input-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setTimeSlotSaturday2(e.target.checked)}
                checked={timeSlotSaturday2}
              />
              13 bis 16 Uhr
            </label>
          </li>
          <li>
            <label className="input-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setTimeSlotSaturday3(e.target.checked)}
                checked={timeSlotSaturday3}
              />
              16 bis 19 Uhr
            </label>
          </li>
          <li>
            <label className="input-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setTimeSlotSaturday4(e.target.checked)}
                checked={timeSlotSaturday4}
              />
              20 bis 22 Uhr
            </label>
          </li>
        </ul>
        <h2>Sonntag, 87. August</h2>
        <ul role="list" className="checkbox-list">
          <li>
            <label className="input-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setTimeSlotSunday1(e.target.checked)}
                checked={timeSlotSunday1}
              />
              10 bis 13 Uhr
            </label>
          </li>
          <li>
            <label className="input-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setTimeSlotSunday2(e.target.checked)}
                checked={timeSlotSunday2}
              />
              13 bis 16 Uhr
            </label>
          </li>
          <li>
            <label className="input-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setTimeSlotSunday3(e.target.checked)}
                checked={timeSlotSunday3}
              />
              16 bis 18 Uhr
            </label>
          </li>
        </ul>
        {noSlotsSelected && (
          <AlertBox>
            <p>Bitte wähle mindestens einen Slot aus.</p>
          </AlertBox>
        )}
        <Link href="/">
          <a className="button button-success">
            <ArrowIcon />
            <span> Speichern & Zurück </span>
          </a>
        </Link>
      </form>
    </>
  );
};

export default Begleitung;
