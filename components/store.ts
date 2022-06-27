import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = <T>(storageKey: string, fallbackState: T) => {
  const item = localStorage.getItem(storageKey);
  const initValue: T =
    item !== null ? JSON.parse(item) ?? fallbackState : fallbackState;

  const [value, setValue] = useState(initValue);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export function checkIdentification(name: string, email: string): boolean {
  const REGEX_MAIL =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (name.trim().length === 0) {
    return false;
  }
  if (email.trim().length === 0) {
    return false;
  }
  if (!email.trim().toLowerCase().match(REGEX_MAIL)) {
    return false;
  }
  return true;
}
