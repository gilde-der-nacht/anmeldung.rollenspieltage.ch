import type { Range } from "$lib/shared/rangeUtil";
import type { HourSchema, daySchemaSaturday, daySchemaSunday, hourSchema } from "$lib/shared/schema/server";
import type { ZodLazy, z } from "zod";

export type TableView = {
    hour: number;
    lunch: boolean;
    dinner: boolean;
    nothing: boolean;
    helping: boolean;
    welcome: boolean;
    kitchen: boolean;
    playing: null | {
        id: string;
        name: string;
        system: string;
        master: string;
        player: string[];
    },
    mastering: null | {
        id: string;
        name: string;
        system: string;
        master: string;
        player: string[];
    },
    rowspan: number;
    continue: "NO" | "YES_AFTER_BREAK" | "YES_HIDE";
}

export function prepareForView(range: Range, data: z.infer<typeof daySchemaSaturday | typeof daySchemaSunday>): TableView[] {
    let lastThree: [HourSchema | null, HourSchema | null, HourSchema | null] = [null, null, null];

    return range.range.map((hour) => {
        if (hour in data) {
            const entry = (data as any)[hour] as HourSchema;
            return {
                hour,
                lunch: entry?.type === "LUNCH"
            };
        }

        return {
            hour,
            lunch: false
        }
    });
}