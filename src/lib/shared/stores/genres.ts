import type { AppState } from "../schema/app";
import { get, writable, type Writable } from "svelte/store";
import type { Genre } from "../schema/enums";
import type { GameRound } from "../schema/complex/gameRoundSchema";

export function createGenresStore(store: Writable<GameRound | AppState>) {
    const _genres = writable({
        fantasy: get(store).genres.includes('fantasy'),
        science_fiction: get(store).genres.includes('science_fiction'),
        horror: get(store).genres.includes('horror'),
        crime: get(store).genres.includes('crime'),
        modern: get(store).genres.includes('modern'),
    });

    _genres.subscribe((g) => {
        const genres: Genre[] = [];
        if (g.fantasy) {
            genres.push('fantasy');
        }
        if (g.science_fiction) {
            genres.push('science_fiction');
        }
        if (g.horror) {
            genres.push('horror');
        }
        if (g.crime) {
            genres.push('crime');
        }
        if (g.modern) {
            genres.push('modern');
        }
        store.update(prev => {
            return { ...prev, genres }
        });
    });
    return _genres;
}