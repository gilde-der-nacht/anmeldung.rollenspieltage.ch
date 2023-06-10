import { toRange, type Day, type Range } from "$lib/shared/schema/shared";

type DayConfig = {
    start: number,
    end: number,
    lunch?: number,
    dinner?: number,
    blocks: number[]
}

type EntryType = "GAME_BLOCK_START" | "LUNCH" | "DINNER" | "GAME_BLOCK_CONT"

type Details = {
    [hour: number]: EntryType;
}

const saturday: DayConfig = {
    start: 10,
    end: 24,
    lunch: 12,
    dinner: 19,
    blocks: [10, 13, 15, 17, 20, 22]
};

const sunday: DayConfig = {
    start: 10,
    end: 19,
    lunch: 12,
    blocks: [10, 13, 15, 17]
};

const constructDayInfos = (day: DayConfig) => {
    const range = toRange(day.start, day.end);

    const details: Details = {}
    range.range.forEach(t => {
        details[t] = "GAME_BLOCK_CONT"
    })


    day.blocks.forEach(t => {
        details[t] = "GAME_BLOCK_START";
    })

    if (day.lunch !== undefined) {
        details[day.lunch] = "LUNCH";
    }

    if (day.dinner !== undefined) {
        details[day.dinner] = "DINNER";
    }

    return {
        range,
        details,
    }
}

export const getDayInfos = (day: Day) => {
    return constructDayInfos(day === "SATURDAY" ? saturday : sunday);
}

type LabelMap = { [K in EntryType]: string }
export const labelMap: LabelMap = {
    GAME_BLOCK_START: "Start Spielblock",
    GAME_BLOCK_CONT: "",
    LUNCH: "Mittagessen",
    DINNER: "Nachtessen",
}

export function getFieldType(day: Day, field: number): EntryType | "OUT_OF_BOUNDS" {
    const config = day === "SATURDAY" ? saturday : sunday;
    if (field < config.start || field >= config.end) {
        return "OUT_OF_BOUNDS";
    }

    if (field === config.lunch) {
        return "LUNCH";
    }

    if (field === config.dinner) {
        return "DINNER";
    }

    if (config.blocks.includes(field)) {
        return "GAME_BLOCK_START";
    }

    return "GAME_BLOCK_CONT";
}

type FieldBlock = {
    activeField: number,
    hoveredFields: Range,
    type: "LUNCH" | "DINNER" | "GAME",
}

export function getFieldBlock(day: Day, field: number): FieldBlock {
    const affectedFields: number[] = [field];
    const currentType = getFieldType(day, field);

    if (currentType === "LUNCH" || currentType === "DINNER") {
        return {
            activeField: field,
            hoveredFields: toRange(field, field + 1),
            type: currentType
        };
    }

    let pointer = 0;
    while (true && currentType !== "GAME_BLOCK_START") {
        pointer--;
        const hour = field + pointer;
        const currType = getFieldType(day, hour);

        if (currType === "GAME_BLOCK_CONT" || currType === "GAME_BLOCK_START") {
            affectedFields.push(hour);
            if (currType === "GAME_BLOCK_START") {
                break;
            }
        } else {
            break;
        }
    }
    pointer = 0;
    while (true) {
        pointer++;
        const hour = field + pointer;
        const currentType = getFieldType(day, hour);

        if (currentType === "GAME_BLOCK_CONT") {
            affectedFields.push(hour);
        } else {
            break;
        }
    }

    return {
        activeField: field,
        hoveredFields: toRange(Math.min(...affectedFields), Math.max(...affectedFields) + 1),
        type: "GAME"
    }
}