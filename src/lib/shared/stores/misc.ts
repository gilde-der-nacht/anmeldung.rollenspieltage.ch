import { gameLength2List, type GameLength2, gameLengthList, type GameLength, type EatPreference, eatPreferenceList, type Progress } from "../schema/enums"

export const localizeGameLength: { [Key in GameLength]: string } = {
    short_rounds: 'Kurz (max. 2 Stunden)',
    long_rounds: "Lang (max. 4 Stunden)",
}

export const gameLengthOptions: { value: GameLength, label: string }[] = gameLengthList.map(g => ({ value: g, label: localizeGameLength[g] }))


export const localizeGameLength2: { [Key in GameLength2]: string } = {
    short_rounds: 'Ich bevorzuge kürzere Spielrunden (ca. 2 Stunden).',
    long_rounds: "Ich bevorzuge längere Spielrunden (ca. 4 Stunden).",
    nothing_selected: "Keine Angabe",
}

export const gameLength2Options: { value: GameLength2, label: string }[] = gameLength2List.map(g => ({ value: g, label: localizeGameLength2[g] }))


export const localizeEatPreference: { [Key in EatPreference]: string } = {
    plans_to_eat: "Ich werde vermutlich von eure Essensangebot gebrauch machen.",
    plans_not_to_eat: "Ich werde mich voraussichtlich selber um meine Verpflegung kümmern.",
    nothing_selected: "Keine Angabe",
}

export const EatPreferenceOptions: { value: EatPreference, label: string }[] = eatPreferenceList.map(g => ({ value: g, label: localizeEatPreference[g] }))

export const progressMap: { [Key in Progress]: string } = {
    INITIALIZED: 'noch nicht abgeschickt',
    IN_PROGRESS: 'noch nicht abgeschickt',
    CONFIRMED: 'Abgeschickt',
    CONFIRMED_W_INVALID_CHANGES: 'Abgeschickt (mit Änderungen)',
    CONFIRMED_W_VALID_CHANGES: 'Abgeschickt (mit Änderungen)',
    RECONFIRMED: 'Abgeschickt',
};
