import type { EntryData, PersonalData, RoundData, ServerData, TimetableData } from "$lib/shared/schema/server.types";
import { getBCIds, getBCPlayerNames } from "./bloodClocktower";

type Day = "sa" | "so";

type ChainFn = (entry: EntryData) => EntryData;

type ChainObj = {
  change: (predicate: boolean | (() => boolean), fn: ChainFn) => ChainObj;
  unpack: () => EntryData;
};

function and(...fns: ChainFn[]): ChainFn {
  return (entry) => {
    return fns.reduce((acc, curr) => curr(acc), entry);
  };
}

function removePlayers(names: string[]): ChainFn {
  return (entry) => {
    return {
      ...entry,
      gamemaster: entry.gamemaster === null ? null : {
        ...entry.gamemaster, players: entry.gamemaster.players.filter(p => !names.includes(p))
      },
      player: entry.player === null ? null : {
        ...entry.player, players: entry.player.players.filter(p => !names.includes(p))
      },
    };
  };
}

function removePlayerOnce(name: string): ChainFn {
  return (entry) => {
    if (entry.gamemaster !== null) {
      const index = entry.gamemaster.players.indexOf(name);
      if (index === -1) {
        return entry;
      }
      return {
        ...entry,
        gamemaster: {
          ...entry.gamemaster,
          players: entry.gamemaster.players.slice(0, index).concat(entry.gamemaster.players.slice(index + 1)),
        }
      };
    }
    if (entry.player !== null) {
      const index = entry.player.players.indexOf(name);
      if (index === -1) {
        return entry;
      }
      return {
        ...entry,
        player: {
          ...entry.player,
          players: entry.player.players.slice(0, index).concat(entry.player.players.slice(index + 1)),
        }
      };
    }
    return entry;
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

function removeEverything(includingJobs = true): ChainFn {
  return (e) => {
    return {
      ok: includingJobs ? false : e.ok,
      gamemaster: null,
      kiosk: includingJobs ? false : e.kiosk,
      kueche: includingJobs ? false : e.kueche,
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

function addPlayer(playerName: string): ChainFn {
  return (entry) => {
    if (entry.gamemaster !== null) {
      return { ...entry, gamemaster: { ...entry.gamemaster, players: [...entry.gamemaster.players, playerName] } };
    }
    if (entry.player !== null) {
      return { ...entry, player: { ...entry.player, players: [...entry.player.players, playerName] } };
    }
    return entry;
  };
}

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

function getIsRound(entry: EntryData): (id: string) => boolean {
  return (id) => entry.player?.id === id || entry.gamemaster?.id === id;
}

function chain(entry: EntryData): ChainObj {
  return {
    change: (predicate, fn) => chain((typeof predicate === "boolean" ? predicate : predicate()) ? fn(entry) : entry),
    unpack: () => entry,
  };
}

function transformEntry(entry: EntryData, day: Day, hour: number, id: string): EntryData {
  const pos = getPos(id, hour, day);
  const isRound = getIsRound(entry);
  return chain(entry)
    .change(true, changeTitle("Fiasko", "Untold"))
    .change(pos({
      ids: [],
      days: ["sa"],
      hours: [15, 16]
    }), and(
      changeTitle("Untold", "Der Countdown"),
      changeMaster("Thomas Stauffer", "Michelle"),
      changeSystem(null, "How to be a hero", "20")
    ))
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
    }), putRound({
      id: "N-1",
      name: "Næandis",
      game_master: "Andrea",
      players: ["Astrid Breitenmoser", "Beatrice Breitenmoser", "Michael Bayer", "Simon Breitenmoser", "Sophia Bayer"],
      max_players: 0,
      system: null,
    }))
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
    .change(pos({
      ids: [],
      hours: [15, 16],
      days: ["sa"]
    }), removePlayers(["Alejandro Jimenez", "Marina Bühlmann"]))
    .change(pos({
      ids: ["f3f4286c-1fa9-4c0d-a118-e912d64ede0c"],
      hours: [15, 16],
      days: ["sa"]
    }), removeEverything())
    .change(pos({
      ids: [
        "f3f4286c-1fa9-4c0d-a118-e912d64ede0c",
        "6db9a6c4-9b8c-4ad0-b662-820d1b769998",
        "aec28e93-d7ae-485c-b689-a0c01a8f9b00",
      ],
      days: ["sa"],
      hours: [17, 18]
    }), putRound({
      id: "cthulhu",
      game_master: "Alejandro Jimenez",
      max_players: 4,
      name: "Cthulhu",
      players: [
        "Marina Bühlmann",
        "Patrick Häusler",
        "Kevin Kurinjirappalli",
        "Lena Brunner",
        "Ronnie Krämer"
      ],
      system: null
    }))
    .change(isRound("1"), and(addPlayer("Jonas"), changeJobs({ kiosk: false })))
    .change(pos(
      {
        ids: ["5d7f05ad-c27b-4c55-953f-64b993cca203"],
        days: ["so"],
        hours: [13]
      }
    ), changeJobs({ kiosk: true }))
    .change(isRound("19") || isRound("7") || isRound("21"), removePlayerOnce("Tasha"))
    .change(true, removePlayers(["Michael Bayer", "Sophia Bayer"]))
    .change(true, removePlayers(["Anna Salamashvili", "Nicolas Scheidegger", ""]))
    .change(isRound("5"), addPlayer("Nikola Micic"))
    .change(pos({
      ids: ["c25077b3-fb6a-4202-8a43-efbc9f62578b", "97ccdf4a-6df6-49a0-aa8b-b9ff13f730bd"],
      days: ["so"],
      hours: [10, 11, 13, 14]
    }), putRound({
      id: "5",
      game_master: "Dimitri Dünki",
      max_players: 0,
      name: "Home is where the heart is",
      system: "City of Mist",
      players: ["Gawain (Christian Hauk)", "Jelica Sterjoska", "Nikola Micic"]
    }))
    .change(pos({ days: ["sa"], hours: [], ids: [] }), removePlayerOnce("Lukas Adler"))
    .change(pos({ ids: ["3f7bb128-fb3f-43fe-ae3c-0cf9307caf47"], days: ["sa"], hours: [] }), removeEverything())
    .change(isRound("9"), removeEverything(false))
    .unpack();
}

const UNREGISTERED = [
  "4a584d05-0a64-41c5-9c8d-427e99dd347f",
  "e3478598-f8b4-474a-aebc-1922a37ec3b1",
  "e3788845-3001-48fe-b7f6-f7d1d4b849c7"
];

export function transform(data: ServerData): ServerData {
  const anmeldungen: Record<string, PersonalData> = {};

  Object.entries(data.anmeldungen).forEach(([id, personalData]) => {
    if (!UNREGISTERED.includes(id)) {
      const timetable = personalData.timetable.map(({ ts }): TimetableData => {
        return { ts: { ...ts, entry: transformEntry(ts.entry, ts.day, ts.hour, id) } };
      });
      anmeldungen[id] = { ...personalData, timetable };
    }
  });
  return { anmeldungen };
}