import type { AppState } from "$lib/shared/schema/app";
import { get, writable, type Writable } from "svelte/store";
import { genreList, type Genre } from "$lib/shared/schema/enums";
import type { GameRound } from "$lib/shared/schema/complex/gameRoundSchema";

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

export const localizeGenre: { [Key in Genre]: string } = {
    fantasy: "Fantasy",
    science_fiction: "Science Fiction",
    horror: "Horror",
    crime: "Krimi",
    modern: "Modern",
}

export const genreOptions: { value: Genre, label: string }[] = genreList.map(g => ({ value: g, label: localizeGenre[g] }))