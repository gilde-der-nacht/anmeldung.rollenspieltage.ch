import { isNonEmptyString } from "$lib/components/form/Validation";
import type { AppState } from "$lib/shared/schema/app";
import { unpackDays } from "./stores/days";
import { unpackGroups } from "./stores/group";

export function validateState(appState: AppState) {
    const { one, two } = unpackGroups(appState);
    const { SATURDAY, SUNDAY } = unpackDays(appState);

    const friend01 = {
        active: one.active,
        name: !isNonEmptyString(one.name) && one.active,
        days: {
            SATURDAY: !SATURDAY && one.days.SATURDAY,
            SUNDAY: !SUNDAY && one.days.SUNDAY,
            EITHER: !one.days.SATURDAY && !one.days.SUNDAY,
        }
    }
    const friend02 = {
        active: two.active,
        name: !isNonEmptyString(two.name) && two.active,
        days: {
            SATURDAY: !SATURDAY && two.days.SATURDAY,
            SUNDAY: !SUNDAY && two.days.SUNDAY,
            EITHER: !two.days.SATURDAY && !two.days.SUNDAY,
        }
    }
    const group = (friend01.active
        && (friend01.name
            || friend01.days.SATURDAY
            || friend01.days.SUNDAY
            || friend01.days.EITHER))
        || (friend02.active
            && (friend02.name
                || friend02.days.SATURDAY
                || friend02.days.SUNDAY
                || friend02.days.EITHER))

    return {
        name: !isNonEmptyString(appState.name),
        email: !isNonEmptyString(appState.email),
        friend01,
        friend02,
        group,
        time: !SATURDAY && !SUNDAY,
        genres: appState.genres.length === 0
    }
}