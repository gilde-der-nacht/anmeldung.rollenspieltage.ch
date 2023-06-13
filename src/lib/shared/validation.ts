import { isNonEmptyString } from "$lib/components/form/Validation";
import type { AppState } from "$lib/shared/schema/app";
import { unpackDays } from "./stores/days";
import { unpackGroups } from "./stores/group";

export function validateState(appState: AppState) {
    const { one, two } = unpackGroups(appState);
    const { SATURDAY, SUNDAY } = unpackDays(appState);

    return {
        name: !isNonEmptyString(appState.name),
        email: !isNonEmptyString(appState.email),
        friend01: {
            active: one.active,
            name: !isNonEmptyString(one.name) && one.active,
            days: {
                SATURDAY: !SATURDAY && one.days.SATURDAY,
                SUNDAY: !SUNDAY && one.days.SUNDAY,
                EITHER: !one.days.SATURDAY && !one.days.SUNDAY,
            }
        },
        friend02: {
            active: two.active,
            name: !isNonEmptyString(two.name) && two.active,
            days: {
                SATURDAY: !SATURDAY && two.days.SATURDAY,
                SUNDAY: !SUNDAY && two.days.SUNDAY,
                EITHER: !two.days.SATURDAY && !two.days.SUNDAY,
            }
        }
    }
}