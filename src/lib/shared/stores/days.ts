import { get, writable, type Writable } from "svelte/store";
import type { AppState } from "../schema/app";
import type { Day } from "../schema/enums";

export function createDaysStore(store: Writable<AppState>) {
    const _days = writable({
        SATURDAY: get(store).days.includes('SATURDAY'),
        SUNDAY: get(store).days.includes('SUNDAY'),
    });
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