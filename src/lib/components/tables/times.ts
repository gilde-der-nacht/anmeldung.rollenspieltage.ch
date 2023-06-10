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
    const range = Array(day.end - day.start).fill(0).map((_, i) => i + day.start);

    const details: Details = {}
    range.forEach(t => {
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

export const getDayInfos = (day: "SATURDAY" | "SUNDAY") => {
    return constructDayInfos(day === "SATURDAY" ? saturday : sunday);
}

type LabelMap = { [K in EntryType]: string }
export const labelMap: LabelMap = {
    GAME_BLOCK_START: "Start Spielblock",
    GAME_BLOCK_CONT: "",
    LUNCH: "Mittagessen",
    DINNER: "Nachtessen",
}