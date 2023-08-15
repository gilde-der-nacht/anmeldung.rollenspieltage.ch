import type { EntryData, PersonalData, RoundData, ServerData, TimetableData } from "$lib/shared/schema/server.types";
import { getBCIds, getBCPlayerNames } from "./bloodClocktower";

type Day = "sa" | "so";

type ChainFn = (entry: EntryData) => EntryData;

type ChainObj = {
  change: (predicate: boolean | (() => boolean), fn: ChainFn) => ChainObj;
  unpack: () => EntryData;
};

function and(fn1: ChainFn, fn2: ChainFn): ChainFn {
  return (entry) => {
    return fn1(fn2(entry));
  };
}

function changeJobs({ ok, kiosk, kueche }: { ok?: boolean, kiosk?: boolean, kueche?: boolean; }): ChainFn {
  return (entry) => {
    return {
      ...entry,
      ok: ok === undefined ? entry.ok : ok,
      kiosk: kiosk === undefined ? entry.kiosk : kiosk,
      kueche: kueche === undefined ? entry.kueche : kueche,
    };
  };
}

function removeEverything(): ChainFn {
  return (_) => {
    return {
      ok: false,
      gamemaster: null,
      kiosk: false,
      kueche: false,
      player: null
    };
  };
}

function changeTitle(titleOld: string, titleNew: string): ChainFn {
  return (entry) => {
    if (entry.gamemaster?.name === titleOld) {
      return { ...entry, gamemaster: { ...entry.gamemaster, name: titleNew } };
    }
    if (entry.player?.name === titleOld) {
      return { ...entry, player: { ...entry.player, name: titleNew } };
    }
    return entry;
  };
}

function changeSystem(systemOld: string | null, systemNew: string | null, id: string): ChainFn {
  return (entry) => {
    if (entry.gamemaster?.system === systemOld && entry.gamemaster?.id === id) {
      return { ...entry, gamemaster: { ...entry.gamemaster, system: systemNew } };
    }
    if (entry.player?.system === systemOld, entry.player?.id === id) {
      return { ...entry, player: { ...entry.player, system: systemNew } };
    }
    return entry;
  };
}

function changeMaster(masterOld: string, masterNew: string): ChainFn {
  return (entry) => {
    if (entry.gamemaster?.game_master === masterOld) {
      return { ...entry, gamemaster: { ...entry.gamemaster, game_master: masterNew } };
    }
    if (entry.player?.game_master === masterOld) {
      return { ...entry, player: { ...entry.player, game_master: masterNew } };
    }
    return entry;
  };
}

function putRound(round: RoundData): ChainFn {
  return (_) => {
    return {
      ok: false,
      gamemaster: null,
      kiosk: false,
      kueche: false,
      player: round
    };
  };
};

function joinBloodClocktower(): ChainFn {
  return (_) => {
    return {
      ok: false,
      gamemaster: null,
      kiosk: false,
      kueche: false,
      player: {
        id: "clocktower",
        name: "Blood on the Clocktower",
        system: "Blood on the Clocktower",
        game_master: "Gawain (Christian Hauk)",
        players: getBCPlayerNames(),
        max_players: 12
      }
    };
  };
}

function getPos(id: string, hour: number, day: Day): ({ ids, hours, days }: { ids: string[], hours: number[], days: Day[]; }) => boolean {
  return ({ ids, hours, days }) => {
    if (ids.length > 0 && !ids.includes(id)) { return false; }
    if (hours.length > 0 && !hours.includes(hour)) { return false; }
    if (days.length > 0 && !days.includes(day)) { return false; }
    return true;
  };
}

function chain(entry: EntryData): ChainObj {
  return {
    change: (predicate, fn) => chain((typeof predicate === "boolean" ? predicate : predicate()) ? fn(entry) : entry),
    unpack: () => entry,
  };
}

function transformEntry(entry: EntryData, day: Day, hour: number, id: string): EntryData {
  const pos = getPos(id, hour, day);
  return chain(entry)
    .change(true, changeTitle("Fiasko", "Untold"))
    .change(pos({
      ids: [],
      days: ["sa"],
      hours: [15, 16]
    }), and(and(
      changeTitle("Untold", "Der Countdown"),
      changeMaster("Thomas Stauffer", "Michelle")
    ), changeSystem(null, "How to be a hero", "20")))
    .change(pos({
      ids: ["OK_Thomas"],
      days: ["sa"],
      hours: [15, 16]
    }), removeEverything())
    .change(pos({
      ids: ["OK_Michelle"],
      days: ["sa"],
      hours: [15, 16]
    }), putRound({
      id: "how",
      game_master: "Michelle",
      system: "How to be a hero",
      max_players: 0,
      name: "Der Countdown",
      players: ["Carla Rauchenstein", "Geneviève Hannes", "Paul Schlauri", " Renato Carlotti"]
    }))
    .change(pos({
      ids: [],
      hours: [17, 18],
      days: ["sa"]
    }), changeTitle("Næandis", "Beak, Feather, Bones"))
    .change(pos({
      ids: [
        "Andrea_Truetsch",
        "e3478598-f8b4-474a-aebc-1922a37ec3b1",
        "0b89d834-389e-44bf-8e2d-531717d5ab2e"
      ],
      hours: [15, 16],
      days: ["sa"]
    }),
      putRound({
        id: "N-1",
        name: "Næandis",
        game_master: "Andrea",
        players: ["Astrid Breitenmoser", "Beatrice Breitenmoser", "Michael Bayer", "Simon Breitenmoser", "Sophia Bayer"],
        max_players: 0,
        system: null,
      })
    )
    .change(pos({
      ids: ["OK_Thomas"],
      hours: [20, 21],
      days: ["sa"]
    }), removeEverything())
    .change(pos({
      ids: ["OK_Adi"],
      hours: [20, 21],
      days: ["sa"]
    }), changeJobs({ ok: true }))
    .change(pos({
      ids: ["OK_Thomas", "295b18a9-8d03-4355-a543-d5796d2c011b", "40a7d68b-16c6-4807-8337-df3b757958ea"],
      hours: [15, 16],
      days: ["so"]
    }), putRound({
      id: "EN-1",
      name: "Follow",
      game_master: "Thomas",
      players: ["Niels Richters", "Eva", "Anna", "Anton"],
      max_players: 0,
      system: "English",
    }))
    .change(pos({
      ids: getBCIds(),
      days: ["sa"],
      hours: [20, 21, 22, 23]
    }), joinBloodClocktower())
    .unpack();
}

export function transform(data: ServerData): ServerData {
  const anmeldungen: Record<string, PersonalData> = {};

  Object.entries(data.anmeldungen).forEach(([id, personalData]) => {
    const timetable = personalData.timetable.map(({ ts }): TimetableData => {
      return { ts: { ...ts, entry: transformEntry(ts.entry, ts.day, ts.hour, id) } };
    });
    anmeldungen[id] = { ...personalData, timetable };
  });
  return { anmeldungen };
}