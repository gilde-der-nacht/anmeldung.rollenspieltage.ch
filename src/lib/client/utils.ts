import { isWithinRangeInclusive, toRange, type Range } from "$lib/shared/rangeUtil";
import type { EntryData } from "$lib/shared/schema/server.types";
import type { TableData } from "$lib/shared/schema/table.types";
import type { DayProgramWebData } from "$lib/shared/schema/web.types";

export const renderNamesList = (names: string[]): string =>
    names.join(", ").replace(/, ([^,]*)$/, " und $1");

const TIMES = {
    sa: {
        start: 10,
        end: 24,
    },
    so: {
        start: 10,
        end: 19,
    }
}

function isItFoodTime(hour: number): boolean {
    return hour === 12 || hour === 19;
}

export function convertToTableView(dayData: DayProgramWebData, personRange: Range, day: "sa" | "so", name: string): TableData {
    const dayRange = toRange(TIMES[day].start, TIMES[day].end);

    const tableData: TableData = {};
    const programIds = new Set<string>();

    let last: null | EntryData = null;

    dayRange.range.forEach(hour => {
        const isFoodTime = isItFoodTime(hour);
        const isParticipating = isWithinRangeInclusive(personRange, hour);

        const entry = dayData[hour];
        if (entry === undefined) {
            tableData[hour] = {
                isFoodTime,
                isParticipating,
                rowspan: 1,
                label: { type: "EMPTY" }
            }
            last = null;
            return;
        }

        if (entry.kiosk && entry.player !== null) {
            if (programIds.has(entry.player.id)) {
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan: 0,
                    label: { type: "NONE" }
                }
                last = entry;
                return;
            } else {
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan: 2,
                    label: {
                        type: "DOUBLE",
                        first: { title: "Helfen", name },
                        second: {
                            id: entry.player.id,
                            game_master: entry.player.game_master,
                            players: renderNamesList(entry.player.players),
                            title: entry.player.name,
                            system: entry.player.system,
                        }
                    }
                }
                last = entry;
                return;
            }
        }

        if (entry.kiosk) {
            if (isItFoodTime(hour)) {
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan: 1,
                    label: {
                        type: "SIMPLE",
                        simple: "Helfen"
                    }
                }
                last = null;
                return;
            }
            if (last?.kiosk) {
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan: 0,
                    label: {
                        type: "NONE"
                    }
                }
                last = entry;
                return;
            } else {
                let rowspan = 1;
                let nextHour = hour + 1;
                while (nextHour < dayRange.end) {
                    const nextHourEntry = dayData[nextHour];
                    if (nextHourEntry === undefined) {
                        break;
                    }
                    if (!nextHourEntry.kiosk) {
                        break;
                    }
                    if (isItFoodTime(nextHour)) {
                        break;
                    }
                    rowspan++;
                    nextHour++;
                }
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan,
                    label: {
                        type: "SIMPLE",
                        simple: "Helfen"
                    }
                }
                last = entry;
                return;
            }
        }

        if (entry.ok) {
            if (isItFoodTime(hour)) {
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan: 1,
                    label: {
                        type: "SIMPLE",
                        simple: "OK/Willkommenstisch"
                    }
                }
                last = null;
                return;
            }
            if (last?.ok) {
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan: 0,
                    label: {
                        type: "NONE"
                    }
                }
                last = entry;
                return;
            } else {
                let rowspan = 1;
                let nextHour = hour + 1;
                while (nextHour < dayRange.end) {
                    const nextHourEntry = dayData[nextHour];
                    if (nextHourEntry === undefined) {
                        break;
                    }
                    if (!nextHourEntry.ok) {
                        break;
                    }
                    if (isItFoodTime(nextHour)) {
                        break;
                    }
                    rowspan++;
                    nextHour++;
                }
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan,
                    label: {
                        type: "SIMPLE",
                        simple: "OK/Willkommenstisch"
                    }
                }
                last = entry;
                return;
            }
        }

        if (entry.kueche) {
            if (isItFoodTime(hour)) {
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan: 1,
                    label: {
                        type: "SIMPLE",
                        simple: "Küche"
                    }
                }
                last = null;
                return;
            }
            if (last?.kueche) {
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan: 0,
                    label: {
                        type: "NONE"
                    }
                }
                last = entry;
                return;
            } else {
                let rowspan = 1;
                let nextHour = hour + 1;
                while (nextHour < dayRange.end) {
                    const nextHourEntry = dayData[nextHour];
                    if (nextHourEntry === undefined) {
                        break;
                    }
                    if (!nextHourEntry.kueche) {
                        break;
                    }
                    if (isItFoodTime(nextHour)) {
                        break;
                    }
                    rowspan++;
                    nextHour++;
                }
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan,
                    label: {
                        type: "SIMPLE",
                        simple: "Küche"
                    }
                }
                last = entry;
                return;
            }
        }

        if (entry.player !== null) {
            if (programIds.has(entry.player.id)) {
                if (isItFoodTime(hour - 1)) {
                    let rowspan = 1;
                    let nextHour = hour + 1;
                    while (nextHour < dayRange.end) {
                        const nextHourEntry = dayData[nextHour];
                        if (nextHourEntry === undefined) {
                            break;
                        }
                        if (nextHourEntry.player === null) {
                            break;
                        }
                        if (nextHourEntry.player.id !== entry.player.id) {
                            break;
                        }
                        if (isItFoodTime(nextHour)) {
                            break;
                        }
                        rowspan++;
                        nextHour++;
                    }
                    tableData[hour] = {
                        isFoodTime,
                        isParticipating,
                        rowspan,
                        label: {
                            type: "COMPLEX",
                            id: entry.player.id,
                            game_master: entry.player.game_master,
                            players: renderNamesList(entry.player.players),
                            system: entry.player.system,
                            title: entry.player.name + " (Fortsetzung)"
                        }
                    }
                    last = entry;
                    return;
                } else {
                    tableData[hour] = {
                        isFoodTime,
                        isParticipating,
                        rowspan: 0,
                        label: {
                            type: "NONE"
                        }
                    }
                    last = entry;
                    return;
                }
            } else {
                let rowspan = 1;
                let nextHour = hour + 1;
                while (nextHour < dayRange.end) {
                    const nextHourEntry = dayData[nextHour];
                    if (nextHourEntry === undefined) {
                        break;
                    }
                    if (nextHourEntry.player === null) {
                        break;
                    }
                    if (nextHourEntry.player.id !== entry.player.id) {
                        break;
                    }
                    if (isItFoodTime(nextHour)) {
                        break;
                    }
                    rowspan++;
                    nextHour++;
                }
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan,
                    label: {
                        type: "COMPLEX",
                        id: entry.player.id,
                        game_master: entry.player.game_master,
                        players: renderNamesList(entry.player.players),
                        system: entry.player.system,
                        title: entry.player.name
                    }
                }
                programIds.add(entry.player.id);
                last = entry;
                return;
            }
        }

        if (entry.gamemaster !== null) {
            if (programIds.has(entry.gamemaster.id)) {
                if (isItFoodTime(hour - 1)) {
                    let rowspan = 1;
                    let nextHour = hour + 1;
                    while (nextHour < dayRange.end) {
                        const nextHourEntry = dayData[nextHour];
                        if (nextHourEntry === undefined) {
                            break;
                        }
                        if (nextHourEntry.gamemaster === null) {
                            break;
                        }
                        if (nextHourEntry.gamemaster.id !== entry.gamemaster.id) {
                            break;
                        }
                        rowspan++;
                        nextHour++;
                    }
                    tableData[hour] = {
                        isFoodTime,
                        isParticipating,
                        rowspan,
                        label: {
                            type: "COMPLEX",
                            id: entry.gamemaster.id,
                            game_master: entry.gamemaster.game_master,
                            players: renderNamesList(entry.gamemaster.players),
                            system: entry.gamemaster.system,
                            title: entry.gamemaster.name + " (Fortsetzung)"
                        }
                    }
                    last = entry;
                    return;
                } else {
                    tableData[hour] = {
                        isFoodTime,
                        isParticipating,
                        rowspan: 0,
                        label: {
                            type: "NONE"
                        }
                    }
                    last = entry;
                    return;
                }
            } else {
                let rowspan = 1;
                let nextHour = hour + 1;
                while (nextHour < dayRange.end) {
                    const nextHourEntry = dayData[nextHour];
                    if (nextHourEntry === undefined) {
                        break;
                    }
                    if (nextHourEntry.gamemaster === null) {
                        break;
                    }
                    if (nextHourEntry.gamemaster.id !== entry.gamemaster.id) {
                        break;
                    }
                    rowspan++;
                    nextHour++;
                }
                tableData[hour] = {
                    isFoodTime,
                    isParticipating,
                    rowspan,
                    label: {
                        type: "COMPLEX",
                        id: entry.gamemaster.id,
                        game_master: entry.gamemaster.game_master,
                        players: renderNamesList(entry.gamemaster.players),
                        system: entry.gamemaster.system,
                        title: entry.gamemaster.name
                    }
                }
                programIds.add(entry.gamemaster.id);
                last = entry;
                return;
            }
        }

    })


    return tableData;
}