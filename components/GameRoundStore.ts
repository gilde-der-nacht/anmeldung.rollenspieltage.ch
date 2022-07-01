import { Dispatch, SetStateAction } from "react";

export type GameRound = {
    id: string;
    name: string;
    duration: number;
    minPlayerCount: number;
    maxPlayerCount: number;
    repetition: number;
    active: boolean;
}

export const getRandomId = () => {
    return Math.random().toString(16).substring(2, 8);
}

export const addGameRound = (newGameRound: GameRound, setter: Dispatch<SetStateAction<GameRound[]>>) => {
    setter((prevState) => {
        return [...prevState, newGameRound];
    })
}

export const updateGameRound = (existingGameRound: GameRound, setter: Dispatch<SetStateAction<GameRound[]>>) => {
    setter((prevState) => {
        return [...(prevState.map((round) => {
            if (round.id === existingGameRound.id) {
                return existingGameRound;
            } else {
                return round;
            }
        }))];
    })
}

export const getGameRoundById = (id: string, state: GameRound[]) => {
    return state.filter(game => game.active).find(game => game.id === id);
}
