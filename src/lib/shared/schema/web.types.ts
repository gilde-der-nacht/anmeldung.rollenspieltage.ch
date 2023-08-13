import type { EntryData } from "./server.types";

export type DayProgramWebData = {
    [hour: string]: EntryData;
}

export type ProgramWebData = {
    sa: DayProgramWebData | null;
    so: DayProgramWebData | null;
}

export type WebData = {
    name: string;
    companions_sa: string[];
    companions_so: string[];
    program: ProgramWebData;
}