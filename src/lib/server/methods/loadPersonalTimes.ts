import { OLYMP } from "$lib/Constants";
import { z } from "zod";

const timeDataSchema = z.object({
    saturday_starttime: z.nullable(z.number()),
    saturday_endtime: z.nullable(z.number()),
    sunday_starttime: z.nullable(z.number()),
    sunday_endtime: z.nullable(z.number()),
})

const serverTimeDataSchema = z.object({
    data: z.array(z.object({
        registrations: z.array(timeDataSchema).nonempty()
    })).nonempty()
})

type SuccessfullLoad = {
    success: true;
    timeData: z.infer<typeof timeDataSchema>;
};

type FailedLoad = {
    success: false;
    status: string;
};

export async function loadPersonalTimes(id: string): Promise<SuccessfullLoad | FailedLoad> {
    if (true || id.length !== 36) {
        return { success: true, timeData: { saturday_starttime: 10, saturday_endtime: 24, sunday_starttime: 10, sunday_endtime: 19 } }
    }

    const base = OLYMP + '/items/participant_23?fields=*.*';
    const url = new URL(base + "&filter[id][_eq]=" + id);

    const res = await fetch(url);
    if (!res.ok) {
        return { success: false, status: "0944-" + res.status };
    }
    const json = await res.json();
    const parsed = serverTimeDataSchema.safeParse(json);

    if (!parsed.success) {
        return { success: false, status: "0942-" + res.status };
    }

    const timeData = parsed.data.data.at(0)?.registrations.at(0);
    if (timeData === undefined) {
        return { success: false, status: "0943-" + res.status };
    }
    return { success: true, timeData }
}