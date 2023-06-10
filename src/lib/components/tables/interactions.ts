import type { AppState } from "$lib/shared/schema/app";
import { toRange, type Day } from "$lib/shared/schema/shared";
import { get, writable, type Writable } from "svelte/store";
import { getDayInfos, getFieldBlock } from "./times";

export type InteractionType = "NONE" | "DELETE" | "PRE_CHECKED" | "CHECKED";

type InteractionDetails = {
    [hour: number]: InteractionType;
}


export const getInteractions = (day: Day, appState: Writable<AppState>) => {
    const getActiveHours = (): number[] => {
        const start = day === "SATURDAY" ? get(appState).saturday_starttime : get(appState).sunday_starttime;
        const end = day === "SATURDAY" ? get(appState).saturday_endtime : get(appState).sunday_endtime;
        if (start === null || end === null) {
            return [];
        }
        return toRange(start, end);
    }

    const mouseIsHovering = writable(false);
    const interactionDetails = writable<InteractionDetails>({})
    const resetInteraction = () => {
        interactionDetails.set(getDayInfos(day).range.reduce((acc, cur) => ({ ...acc, [cur]: "NONE" }), {}))

        const activeHours = getActiveHours();
        if (activeHours.length === 0) {
            return;
        }
        interactionDetails.set(activeHours.reduce((acc, cur) => ({ ...acc, [cur]: "CHECKED" }), {}))

    }
    resetInteraction();

    const resetDay = (): boolean => {
        switch (day) {
            case "SATURDAY":
                appState.update((prev) => {
                    return {
                        ...prev,
                        saturday_starttime: null,
                        saturday_endtime: null,
                    };
                })
                return true;

            case "SUNDAY":
                appState.update((prev) => {
                    return {
                        ...prev,
                        sunday_starttime: null,
                        sunday_endtime: null,
                    };
                })
                return true;
        }
    }

    const onMouseEnter = (field: number) => {
        if (field !== 0) {
            const fieldBlock = getFieldBlock(day, field);
            interactionDetails.update(prev => {
                const next = { ...prev };
                fieldBlock.hoveredFields.forEach(h => {
                    next[h] = "DELETE";
                })
                return next;
            })
        }
        mouseIsHovering.set(true)
    }

    const onMouseLeave = () => {
        resetInteraction();
        mouseIsHovering.set(false)
    }

    const onClick = (field: number) => { }

    return {
        resetDay,
        onMouseEnter,
        onMouseLeave,
        onClick,
        mouseIsHovering,
        interactionDetails
    }
}