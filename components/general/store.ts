import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GameRound } from "../GameRoundStore";

export const useLocalStorage = <T>(
  storageKey: string,
  fallbackState: T
): [T, Dispatch<SetStateAction<T>>] => {
  let initValue = fallbackState;

  if (typeof window !== "undefined") {
    const item = localStorage.getItem(storageKey);
    if (item !== null && item.trim().length > 0) {
      try {
        initValue = JSON.parse(item);
      } catch (_) {
        console.log(`Problem parsing localStorage item ${storageKey}. Will fallback to ${initValue}.`);
      }
    }
  }

  const [value, setValue] = useState(initValue);
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export function checkName(name: string) {
  return !(name.trim().length === 0);
}

export function checkEmail(email: string) {
  const REGEX_MAIL =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return (
    email.trim().length > 0 &&
    email.trim().toLowerCase().match(REGEX_MAIL) !== null
  );
}

export function checkIdentification(name: string, email: string): boolean {
  return checkName(name) && checkEmail(email);
}

export type StoreData = {
  name: string;
  email: string;
  companion1: string;
  companion2: string;
  timeSlotSaturday1: boolean;
  timeSlotSaturday2: boolean;
  timeSlotSaturday3: boolean;
  timeSlotSaturday4: boolean;
  timeSlotSunday1: boolean;
  timeSlotSunday2: boolean;
  timeSlotSunday3: boolean;
  likeToPlay: boolean;
  fantasy: boolean;
  scifi: boolean;
  horror: boolean;
  crime: boolean;
  modern: boolean;
  likeToMaster: boolean;
  gameRounds: GameRound[];
  catering: number;
  kioskDuration: number;
  cocAccepted: boolean;
  secret: string;
  recentlySaved: boolean;
  atLeastOnceSaved: boolean;
  workshop1: boolean;
  workshop2: boolean;
  workshop3: boolean;
};

export function getStateFromLocalStorage() {
  return new Promise((resolve) => setTimeout(resolve, 0))
    .then(() => {
      const data = [
        "name",
        "email",
        "companion1",
        "companion2",
        "timeSlotSaturday1",
        "timeSlotSaturday2",
        "timeSlotSaturday3",
        "timeSlotSaturday4",
        "timeSlotSunday1",
        "timeSlotSunday2",
        "timeSlotSunday3",
        "likeToPlay",
        "fantasy",
        "scifi",
        "horror",
        "crime",
        "modern",
        "likeToMaster",
        "gameRounds",
        "catering",
        "kioskDuration",
        "cocAccepted",
        "recentlySaved",
        "atLeastOnceSaved",
        "workshop1",
        "workshop2",
        "workshop3",
      ].map((key) => {
        const value: string =
          localStorage.getItem(key) ?? JSON.stringify("-missing-");
        return { [key]: JSON.parse(value) };
      });
      return data;
    })
    .then((data) => {
      return data.reduce((obj, item) => ({ ...obj, ...item }), {});
    });
}
