import type { EntryData, PersonalData, TimetableData } from "$lib/shared/schema/server.types";
import type { DayProgramWebData, WebData } from "$lib/shared/schema/web.types";

function isEmpty(entry: EntryData): boolean {
    if (entry.gamemaster !== null) {
        return false;
    }
    if (entry.player !== null) {
        return false;
    }
    if (entry.kiosk) {
        return false;
    }
    if (entry.kueche) {
        return false;
    }
    if (entry.ok) {
        return false;
    }
    return true;
}

function splitByDay(timetable: TimetableData[]): { sa_filtered: TimetableData[], so_filtered: TimetableData[] } {
    return {
        sa_filtered: timetable.filter(entry => entry.ts.day === "sa"),
        so_filtered: timetable.filter(entry => entry.ts.day === "so"),
    }
}

function convertDayToWeb(data: TimetableData[]): null | DayProgramWebData {
    const dayProgramm: DayProgramWebData = {};
    data.forEach(({ ts: { hour, entry } }) => {
        if (!isEmpty(entry)) {
            dayProgramm[hour] = entry;
        }
    });
    if (Object.entries(dayProgramm).length === 0) {
        return null;
    }
    return dayProgramm;
}

export function convertToWeb(data: PersonalData): WebData {
    const { sa_filtered, so_filtered } = splitByDay(data.timetable);

    const sa = convertDayToWeb(sa_filtered);
    const so = convertDayToWeb(so_filtered);

    return {
        name: data.name,
        companions_sa: data.companions_sa,
        companions_so: data.companions_so,
        program: { sa, so }
    }
}