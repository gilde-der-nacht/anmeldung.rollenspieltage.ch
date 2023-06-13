import { get, writable, type Writable } from "svelte/store";
import type { AppState } from "$lib/shared/schema/app";
import type { Day } from "$lib/shared/schema/enums";

export function createGroupStore(store: Writable<AppState>) {
    const group = writable(unpackGroups(get(store)));
    group.subscribe((g) => {
        const daysOne: Day[] = [];
        if (g.one.days.SATURDAY) {
            daysOne.push('SATURDAY');
        }
        if (g.one.days.SUNDAY) {
            daysOne.push('SUNDAY');
        }
        const daysTwo: Day[] = [];
        if (g.two.days.SATURDAY) {
            daysTwo.push('SATURDAY');
        }
        if (g.two.days.SUNDAY) {
            daysTwo.push('SUNDAY');
        }
        store.update(prev => {
            return {
                ...prev, group: [
                    { ...g.one, days: daysOne },
                    { ...g.two, days: daysTwo },
                ]
            }
        });
    });
    return group;
}

export function unpackGroups(appState: AppState) {
    const [one, two] = appState.group;
    if (one === undefined || two === undefined) {
        throw new Error('3204: Unbekannter Fehler');
    }
    return {
        one: {
            ...one,
            days: {
                SATURDAY: one.days.includes('SATURDAY'),
                SUNDAY: one.days.includes('SUNDAY'),
            },
        },
        two: {
            ...two,
            days: {
                SATURDAY: two.days.includes('SATURDAY'),
                SUNDAY: two.days.includes('SUNDAY'),
            },
        },
    }
}