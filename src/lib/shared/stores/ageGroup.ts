import { get, writable, type Writable } from "svelte/store";
import type { GameRound } from "../schema/complex/gameRoundSchema";
import type { AgeGroup } from "../schema/enums";

export function createAgeGroupStore(store: Writable<GameRound>) {
    const _age_groups = writable({
        child: get(store).age_groups.includes('CHILD'),
        teen: get(store).age_groups.includes('TEEN'),
        adult: get(store).age_groups.includes('ADULT'),
    });
    _age_groups.subscribe((g) => {
        const age_groups: AgeGroup[] = [];
        if (g.child) {
            age_groups.push('CHILD');
        }
        if (g.teen) {
            age_groups.push('TEEN');
        }
        if (g.adult) {
            age_groups.push('ADULT');
        }
        store.update(prev => {
            return { ...prev, age_groups };
        });
    });
    return _age_groups;
}