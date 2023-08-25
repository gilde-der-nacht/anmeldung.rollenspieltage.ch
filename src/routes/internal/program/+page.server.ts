import { loadAllProgram } from '$lib/server/methods/loadAllProgram';
import type { Day } from '$lib/shared/common';
import { toRange } from '$lib/shared/rangeUtil';
import type { PersonalData } from '$lib/shared/schema/server.types';
import { error } from '@sveltejs/kit';
import type { TableColumn, TableEntry } from '../view.types';

type ProgramEntry = {
  name: string;
  master: string;
  players: string[];
  id: string;
  day: Day;
  hour: number;
};

type GroupEntry = {
  name: string;
  master: string;
  players: string[];
  id: string;
  day: Day;
  hours: number[];
};

function filterEntries(data: {
  [K: string]: PersonalData;
}): ProgramEntry[] {
  const entries: ProgramEntry[] = [];

  Object.entries(data).forEach(([_, { timetable }]) => {
    timetable.forEach(({ ts: { day, hour, entry } }) => {
      if (entry.gamemaster !== null) {
        const master = entry.gamemaster.game_master.trim();
        const players = entry.gamemaster.players.map(p => p.trim());
        const id = entry.gamemaster.id;
        let gameName = entry.gamemaster.name.trim();
        if (entry.gamemaster.system) {
          gameName += " (" + entry.gamemaster.system + ")";
        }
        entries.push({
          day,
          hour,
          id,
          master,
          name: gameName,
          players
        });
      }
    });
  });

  return entries;
}

function getMissingRounds(data: {
  [K: string]: PersonalData;
}, idsAlreadyFound: string[]): ProgramEntry[] {
  const entries: ProgramEntry[] = [];
  const additionalFound: string[] = [];

  Object.entries(data).forEach(([_, { timetable }]) => {
    timetable.forEach(({ ts: { day, hour, entry } }) => {
      if (entry.player !== null && !idsAlreadyFound.includes(entry.player.id)) {
        const idHourDay = entry.player.id + "-" + hour + "-" + day;
        if (additionalFound.includes(idHourDay)) {
          return;
        }

        const master = entry.player.game_master.trim();
        const players = entry.player.players.map(p => p.trim());
        const id = entry.player.id;
        let gameName = entry.player.name.trim();
        if (entry.player.system) {
          gameName += " (" + entry.player.system + ")";
        }
        entries.push({
          day,
          hour,
          id,
          master,
          name: gameName,
          players
        });

        additionalFound.push(idHourDay);
      }
    });
  });
  return entries;

}

function groupEntries(data: ProgramEntry[]): GroupEntry[] {
  const byIds: { [id: string]: GroupEntry; } = {};
  data.forEach(entry => {
    const prev = byIds[entry.id];
    if (prev === undefined) {
      byIds[entry.id] = { day: entry.day, id: entry.id, name: entry.name, master: entry.master, players: entry.players, hours: [entry.hour] };
    } else {
      byIds[entry.id] = { ...prev, hours: [...prev.hours, entry.hour] };
    }
  });

  const groups: GroupEntry[] = [];
  Object.values(byIds).forEach(entry => {
    const hours = entry.hours.sort();
    const hourGroups: number[][] = [];
    let currentGroup: number[] = [];
    let lastHour: number | null = null;

    hours.forEach(hour => {
      if (lastHour === null) {
        currentGroup.push(hour);
      } else if (lastHour + 1 === hour) {
        currentGroup.push(hour);
      } else {
        hourGroups.push(currentGroup);
        currentGroup = [hour];
      }
      lastHour = hour;
    });
    hourGroups.push(currentGroup);
    hourGroups.forEach(group => {
      groups.push({ ...entry, hours: group });
    });
  });
  return groups;
}

function mapToCols(data: GroupEntry[]): GroupEntry[][] {


  const cols: { usedHours: number[], entries: GroupEntry[]; }[] = [];
  data.forEach(entry => {
    let foundSpace = false;
    cols.forEach(col => {
      if (!entry.hours.some((hour) => col.usedHours.includes(hour)) && !foundSpace) {
        col.usedHours.push(...entry.hours);
        col.entries.push(entry);
        foundSpace = true;
      }
    });
    if (!foundSpace) {
      cols.push({ usedHours: [...entry.hours], entries: [entry] });
    }
  });
  return cols.map(col => col.entries);
}


function mapToTableView(hour: number, group: GroupEntry[]): TableEntry {
  const entry = group.find((e) => e.hours.includes(hour));

  if (entry === undefined) {
    return {
      kind: 'empty',
      hour,
      rowspan: 1,
    };
  }
  const startHour = Math.min(...entry.hours);
  const duration = entry.hours.length;
  if (startHour === hour) {
    return {
      kind: 'filled',
      hour,
      rowspan: duration,
      id: entry.id,
      name: entry.name,
      small: entry.master + " (" + entry.players.join(", ") + ")"
    };
  }
  return {
    kind: "none",
    hour
  };
}


function createTableView(groups: GroupEntry[][], day: Day, label: string): TableColumn {
  const dayHours = toRange(10, day === "sa" ? 24 : 17);
  const cols = groups.map(group => {
    return dayHours.range.map(hour => mapToTableView(hour, group));
  });

  return {
    label,
    cols
  };
}

export const load = async () => {
  const response = await loadAllProgram();
  if (!response.success) {
    throw error(400, 'Problem while computing and loading the data.');
  }

  const entries = filterEntries(response.data);
  const additionalEntries = getMissingRounds(response.data, entries.map(e => e.id));

  const all = entries.concat(additionalEntries);  

  const gamesSa = groupEntries(all.filter(e => e.day === "sa"));
  const gamesSo = groupEntries(all.filter(e => e.day === "so"));

  const gamesSaView = mapToCols(gamesSa);
  const gamesSoView = mapToCols(gamesSo);

  const gamesSaCol = createTableView(gamesSaView, "sa", "Spielrunden");
  const gamesSoCol = createTableView(gamesSoView, "so", "Spielrunden");

  return {
    gamesSaCol,
    gamesSoCol,
  };
};
