export type Range = {
    range: number[];
    start: number;
    end: number;
}

export function isWithinRange(range: Range, target: number): boolean {
    return target >= range.start && target < range.end;
}

export const toRange = (from: number, to: number): Range => {
    const _toRange = (from: number, to: number): number[] => {
        return Array(to - from).fill(0).map((_, i) => i + from);
    }

    if (from === to) {
        return {
            range: [from],
            start: from,
            end: from,
        };
    }

    if (from > to) {
        return {
            range: _toRange(to, from),
            start: to,
            end: from,
        };
    }
    return {
        range: _toRange(from, to),
        start: from,
        end: to,
    };
}