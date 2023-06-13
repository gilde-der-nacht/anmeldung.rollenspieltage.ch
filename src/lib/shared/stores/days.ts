import { get, writable, type Writable } from "svelte/store";
import type { AppState } from "$lib/shared/schema/app";
import type { Day } from "$lib/shared/schema/enums";

export function createDaysStore(store: Writable<AppState>) {
    const _days = writable(unpackDays(get(store)));
    _days.subscribe((d) => {
        const days: Day[] = [];
        if (d.SATURDAY) {
            days.push('SATURDAY');
        }
        if (d.SUNDAY) {
            days.push('SUNDAY');
        }
        store.update(prev => {
            return { ...prev, days }
        })
    });
    return _days;
}

export function unpackDays(appState: AppState) {
    return {
        SATURDAY: appState.days.includes('SATURDAY'),
        SUNDAY: appState.days.includes('SUNDAY'),
    }
}