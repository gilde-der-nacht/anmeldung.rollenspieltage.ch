import { AppState } from "@util/AppState";

type Game = {
  game_master: string;
  id: number;
  max_players: number;
  name: string;
  players: string[];
};

type Details = {
  kiosk: boolean;
  kueche: boolean;
  ok: boolean;
  gamemaster: null | Game;
  player: null | Game;
};

type TimeEntry = {
  ts: {
    day: "sa" | "so";
    hour: 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;
    entry: Details;
  };
};

const hasProp = <K extends PropertyKey>(
  data: object,
  prop: K
): data is Record<K, unknown> => {
  return prop in data;
};

const isArrayOfType = <T>(arr: unknown, type: string): arr is T[] => {
  if (!Array.isArray(arr)) {
    return false;
  }
  return arr.every((a) => typeof a === type);
};

const typecheckTimeEntries = (arr: object[]): arr is TimeEntry[] => {
  return arr.every((a) => {
    if (!hasProp(a, "ts")) {
      return false;
    }
    const { ts } = a;
    if (typeof ts !== "object" || ts === null) {
      return false;
    }
    if (!(hasProp(ts, "day") && hasProp(ts, "hour") && hasProp(ts, "entry"))) {
      return false;
    }
    const { day, entry, hour } = ts;
    if (!(day === "sa" || day === "so")) {
      return false;
    }
    if (typeof hour !== "number") {
      return false;
    }
    if (![10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].includes(hour)) {
      return false;
    }
    if (typeof entry !== "object" || entry === null) {
      return false;
    }
    if (
      !(
        hasProp(entry, "kiosk") &&
        hasProp(entry, "kueche") &&
        hasProp(entry, "ok") &&
        hasProp(entry, "gamemaster") &&
        hasProp(entry, "player")
      )
    ) {
      return false;
    }
    const { kiosk, kueche, ok, gamemaster, player } = entry;

    if (typeof kiosk !== "boolean") {
      return false;
    }
    if (typeof kueche !== "boolean") {
      return false;
    }
    if (typeof ok !== "boolean") {
      return false;
    }
    if (!(typeof gamemaster === "object" || gamemaster === null)) {
      return false;
    }
    if (!(typeof player === "object" || player === null)) {
      return false;
    }
    if (gamemaster !== null) {
      if (
        !(
          hasProp(gamemaster, "game_master") &&
          hasProp(gamemaster, "id") &&
          hasProp(gamemaster, "max_players") &&
          hasProp(gamemaster, "name") &&
          hasProp(gamemaster, "players")
        )
      ) {
        return false;
      }
      const { game_master, id, max_players, name, players } = gamemaster;
      if (typeof game_master !== "string") {
        return false;
      }
      if (typeof id !== "number") {
        return false;
      }
      if (typeof max_players !== "number") {
        return false;
      }
      if (typeof name !== "string") {
        return false;
      }
      if (!isArrayOfType<string>(players, "string")) {
        return false;
      }
    }
    if (player !== null) {
      if (
        !(
          hasProp(player, "game_master") &&
          hasProp(player, "id") &&
          hasProp(player, "max_players") &&
          hasProp(player, "name") &&
          hasProp(player, "players")
        )
      ) {
        return false;
      }
      const { game_master, id, max_players, name, players } = player;
      if (typeof game_master !== "string") {
        return false;
      }
      if (typeof id !== "number") {
        return false;
      }
      if (typeof max_players !== "number") {
        return false;
      }
      if (typeof name !== "string") {
        return false;
      }
      if (!isArrayOfType<string>(players, "string")) {
        return false;
      }
    }
    return true;
  });
};

export const parseRawData = (raw: unknown): AppState => {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid Server Data");
  }
  if (!hasProp(raw, "privateBody")) {
    throw new Error("Invalid Server Data");
  }
  const { privateBody } = raw;
  if (typeof privateBody !== "object" || privateBody === null) {
    throw new Error("Invalid Server Data");
  }
  if (
    !hasProp(privateBody, "name") ||
    !hasProp(privateBody, "companions") ||
    !hasProp(privateBody, "timetable")
  ) {
    throw new Error("Invalid Server Data");
  }

  const { name, companions, timetable } = privateBody;

  if (typeof name !== "string") {
    throw new Error("Invalid Server Data");
  }
  if (!isArrayOfType<string>(companions, "string")) {
    throw new Error("Invalid Server Data");
  }
  if (!isArrayOfType<object>(timetable, "object")) {
    throw new Error("Invalid Server Data");
  }
  if (!typecheckTimeEntries(timetable)) {
    throw new Error("Invalid Server Data");
  }

  return { hasLoaded: false };
};
