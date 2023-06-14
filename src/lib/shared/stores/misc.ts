import { gameLength2List, type GameLength2, gameLengthList, type GameLength } from "../schema/enums"

export const localizeGameLength: { [Key in GameLength]: string } = {
    short_rounds: 'Kurz (max. 2 Stunden)',
    long_rounds: "Lang (max. 4 Stunden)",
}

export const gameLengthOptions: { value: GameLength, label: string }[] = gameLengthList.map(g => ({ value: g, label: localizeGameLength[g] }))


export const localizeGameLength2: { [Key in GameLength2]: string } = {
    nothing_selected: "Keine Angabe",
    short_rounds: 'Ich bevorzuge kürzere Spielrunden (ca. 2 Stunden).',
    long_rounds: "Ich bevorzuge längere Spielrunden (ca. 4 Stunden).",
}

export const gameLength2Options: { value: GameLength2, label: string }[] = gameLength2List.map(g => ({ value: g, label: localizeGameLength2[g] }))