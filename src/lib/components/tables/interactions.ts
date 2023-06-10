import type { AppState } from "$lib/shared/schema/app";
import { get, writable, type Writable } from "svelte/store";
import { getDayInfos, getFieldBlock } from "./times";
import type { Day } from "$lib/shared/schema/shared";
import { toRange, type Range } from "$lib/shared/rangeUtil";

export type InteractionType = "NONE" | "DELETE" | "PRE_CHECKED" | "CHECKED";

type InteractionDetails = {
    [hour: number]: InteractionType;
}

type ActiveHours = Range | null


export const getInteractions = (day: Day, appState: Writable<AppState>) => {
    const getActiveHours = (): ActiveHours => {
        const start = day === "SATURDAY" ? get(appState).saturday_starttime : get(appState).sunday_starttime;
        const end = day === "SATURDAY" ? get(appState).saturday_endtime : get(appState).sunday_endtime;
        if (start === null || end === null) {
            return null;
        }
        return toRange(start, end)
    }

    const mouseIsHovering = writable(false);
    const dayHasActiveHours = writable(getActiveHours() !== null);
    const interactionDetails = writable<InteractionDetails>({})
    const resetInteraction = () => {
        interactionDetails.set(getDayInfos(day).range.range.reduce((acc, cur) => ({ ...acc, [cur]: "NONE" }), {}))

        const activeHours = getActiveHours();
        if (activeHours === null) {
            return;
        }
        interactionDetails.set(activeHours.range.reduce((acc, cur) => ({ ...acc, [cur]: "CHECKED" }), {}));
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
                resetInteraction();
                return true;

            case "SUNDAY":
                appState.update((prev) => {
                    return {
                        ...prev,
                        sunday_starttime: null,
                        sunday_endtime: null,
                    };
                })
                resetInteraction();
                return true;
        }
    }

    const activateHours = (range: Range) => {
        if (day === "SATURDAY") {
            appState.update(prev => ({ ...prev, saturday_starttime: range.start, saturday_endtime: range.end }));
        }
        if (day === "SUNDAY") {
            appState.update(prev => ({ ...prev, sunday_starttime: range.start, sunday_endtime: range.end }));
        }
    }

    const deleteHours = () => {
        if (day === "SATURDAY") {
            appState.update(prev => ({ ...prev, saturday_starttime: null, saturday_endtime: null }));
        }
        if (day === "SUNDAY") {
            appState.update(prev => ({ ...prev, sunday_starttime: null, sunday_endtime: null }));
        }
    }

    const onMouseEnter = (field: number) => {
        mouseIsHovering.set(true)
        if (field === 0) {
            return;
        }
        const fieldBlock = getFieldBlock(day, field);
        const activeHours = getActiveHours();

        if (activeHours === null) {
            interactionDetails.update(prev => {
                const next = { ...prev };
                fieldBlock.hoveredFields.range.forEach(h => {
                    next[h] = "PRE_CHECKED";
                })
                return next;
            })
        } else if (activeHours.start <= field && activeHours.end > field) {
            interactionDetails.update(prev => {
                const next = { ...prev };
                activeHours.range.forEach(h => {
                    next[h] = "DELETE";
                })
                return next;
            })
        } else if (activeHours.start > field) {
            const range = toRange(fieldBlock.hoveredFields.start, activeHours.start);
            interactionDetails.update(prev => {
                const next = { ...prev };
                range.range.forEach(h => {
                    next[h] = "PRE_CHECKED";
                })
                return next;
            })
        } else {
            const range = toRange(fieldBlock.hoveredFields.end, activeHours.end);
            interactionDetails.update(prev => {
                const next = { ...prev };
                range.range.forEach(h => {
                    next[h] = "PRE_CHECKED";
                })
                return next;
            })
        }
    }

    const onMouseLeave = () => {
        resetInteraction();
        mouseIsHovering.set(false)
    }

    const onClick = (field: number) => {
        if (field === 0) {
            return;
        }

        const fieldBlock = getFieldBlock(day, field);
        const activeHours = getActiveHours();

        if (activeHours === null) {
            activateHours(fieldBlock.hoveredFields);
            dayHasActiveHours.set(true);
        } else if (activeHours.start <= field && activeHours.end > field) {
            deleteHours();
            dayHasActiveHours.set(false);
        } else if (activeHours.start > field) {
            const range = toRange(fieldBlock.hoveredFields.start, activeHours.end);
            activateHours(range);
            dayHasActiveHours.set(true);
        } else {
            const range = toRange(activeHours.start, fieldBlock.hoveredFields.end);
            activateHours(range);
            dayHasActiveHours.set(true);
        }

        resetInteraction();
    }

    return {
        resetDay,
        onMouseEnter,
        onMouseLeave,
        onClick,
        interactionDetails,
        dayHasActiveHours,
    }
}