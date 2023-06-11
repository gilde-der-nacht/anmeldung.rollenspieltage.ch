import type { GameRound } from "$lib/shared/schema/complex/gameRoundSchema";

export function getDefaultGameRound(): GameRound {
    return {
        id: crypto.randomUUID(),
        title: '',
        system: '',
        duration: 'long_rounds',
        player_count_min: 3,
        player_count_max: 4,
        genres: [],
        age_groups: ['CHILD', 'TEEN', 'ADULT'],
        active: true,
    }
}