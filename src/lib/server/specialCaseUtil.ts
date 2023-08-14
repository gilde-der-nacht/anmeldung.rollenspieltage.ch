import type { PersonalData, ServerData } from "$lib/shared/schema/server.types";

export function generateSpecialCases(data: ServerData): Map<string, string> {
    const specialCases = new Map<string, string>();

    Object.values(data.anmeldungen).forEach(({ name, timetable }) => {
        timetable.forEach(({ ts: { entry } }) => {
            if (entry.kiosk && entry.player !== null) {
                specialCases.set(entry.player.id, name);
            }
        })
    })

    return specialCases;
}

export function applySpecialCases(data: PersonalData, specialCases: Map<string, string>): PersonalData {
    return {
        ...data, timetable: [...data.timetable.map((tt) => {
            const player = tt.ts.entry.player;
            if (player === null) {
                return tt;
            }
            if (!specialCases.has(player.id)) {
                return tt;
            }
            const nameToBeRemoved = specialCases.get(player.id);
            if (nameToBeRemoved === undefined) {
                throw new Error("Should not be happening");
            }
            const players = player.players.filter(name => name !== nameToBeRemoved);
            return {
                ts: {
                    ...tt.ts,
                    entry: {
                        ...tt.ts.entry,
                        player: { ...player, players }
                    }
                }
            }
        })]
    }
}