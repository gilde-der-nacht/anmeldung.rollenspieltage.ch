import type { string } from "zod";

export type TableData = Record<string, {
    isParticipating: boolean;
    isFoodTime: boolean;
    rowspan: number;
    label: {
        type: "EMPTY";
    } | {
        type: "NONE";
    } | {
        type: "SIMPLE";
        simple: string;
    } | {
        type: "COMPLEX";
        title: string;
        system: string | null;
        game_master: string;
        players: string;
        id: string;
    } | {
        type: "DOUBLE";
        first: {
            title: string;
            name: string;
        };
        second: {
            title: string;
            system: string | null;
            game_master: string;
            players: string;
            id: string;
        }
    };
}>;