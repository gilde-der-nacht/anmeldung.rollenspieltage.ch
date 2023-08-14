import type { ServerData, TimetableData } from "$lib/shared/schema/server.types";

const NAMES = {
  "295b18a9-8d03-4355-a543-d5796d2c011b": {
    name: "Niels Richters",
    companions_sa: ["Eva"],
    companions_so: ["Eva"],
  },
  "40a7d68b-16c6-4807-8337-df3b757958ea": {
    name: "Anna",
    companions_sa: ["Anton"],
    companions_so: ["Anton"],
  }
};

export function generateEnglishCases(id: keyof typeof NAMES): ServerData {
  const n = NAMES[id];

  const sa: TimetableData[] = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(hour => {
    return {
      ts: {
        day: "sa",
        hour,
        entry: {
          gamemaster: null,
          kiosk: false,
          kueche: false,
          ok: false,
          player: null,
        }
      }
    };
  });
  const so: TimetableData[] = [10, 11, 12, 13, 14, 15, 16,].map(hour => {
    return {
      ts: {
        day: "so",
        hour,
        entry: {
          gamemaster: null,
          kiosk: false,
          kueche: false,
          ok: false,
          player: null,
        }
      }
    };
  });

  return {
    anmeldungen: {
      [id]: {
        name: n.name,
        companions_sa: n.companions_sa,
        companions_so: n.companions_so,
        timetable: sa.concat(so)
      }
    }
  };
}