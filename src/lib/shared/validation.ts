import { isNonEmptyString } from "$lib/components/form/Validation";
import type { AppState } from "$lib/shared/schema/app";
import { unpackDays } from "./stores/days";
import { unpackGroups } from "./stores/group";

export function validateState(appState: AppState) {
    const { one, two } = unpackGroups(appState);
    const { SATURDAY, SUNDAY } = unpackDays(appState);

    const name = !isNonEmptyString(appState.name);
    const email = !isNonEmptyString(appState.email);

    const contact = {
        name, email, all: name || email
    }

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

    const group = (SATURDAY || SUNDAY)
        && ((friend01.active
            && (friend01.name
                || friend01.days.SATURDAY
                || friend01.days.SUNDAY
                || friend01.days.EITHER))
            || (friend02.active
                && (friend02.name
                    || friend02.days.SATURDAY
                    || friend02.days.SUNDAY
                    || friend02.days.EITHER)))

    const T_EITHER = !SATURDAY && !SUNDAY;
    const T_SATURDAY = appState.saturday_starttime === null
        || appState.saturday_endtime === null;
    const T_SUNDAY = appState.sunday_starttime === null
        || appState.sunday_endtime === null;

    const genres = appState.wants_to_play && appState.genres.length === 0;
    const gameRounds = appState.wants_to_master && (appState.game_rounds ?? []).filter(r => r.active).length === 0;
    const generel = !(appState.wants_to_help
        || appState.wants_to_master
        || appState.wants_to_play);

    return {
        contact,
        group: {
            friend01, friend02, all: group
        },
        time: {
            EITHER: T_EITHER,
            SATURDAY: T_SATURDAY,
            SUNDAY: T_SUNDAY,
            GENERAL: T_EITHER || T_SATURDAY || T_SUNDAY
        },
        genres,
        gameRounds,
        generel,
        all: contact.all || group || T_EITHER || T_SATURDAY || T_SUNDAY || genres || gameRounds || generel
    }
}