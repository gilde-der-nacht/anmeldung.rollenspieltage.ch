import type { AppState } from "$lib/shared/schema/app";
import type { Day } from "$lib/shared/schema/enums";
import { unpackGroups } from "$lib/shared/stores/group";

export function summaryHelper(appState: AppState) {
    const { one, two } = unpackGroups(appState);

    return {
        names: {
            SATURDAY: [appState.name, one.active && one.days.SATURDAY ? one.name : null, two.active && two.days.SATURDAY ? two.name : null].filter(e => e !== null).join(", "),
            SUNDAY: [appState.name, one.active && one.days.SUNDAY ? one.name : null, two.active && two.days.SUNDAY ? two.name : null].filter(e => e !== null).join(", "),
        },
        showTick: (day: Day, block: number): boolean => {
            if (day === "SATURDAY") {
                const { saturday_starttime: start, saturday_endtime: end } = appState;
                if (start === null || end === null) {
                    return false;
                }
                return block >= start && block < end;
            }
            const { sunday_starttime: start, sunday_endtime: end } = appState;
            if (start === null || end === null) {
                return false;
            }
            return block >= start && block < end;
        }
    }
}