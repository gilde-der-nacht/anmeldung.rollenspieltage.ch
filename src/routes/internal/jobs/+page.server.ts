import { loadAllProgram } from '$lib/server/methods/loadAllProgram';
import type { Day } from '$lib/shared/common';
import { toRange } from '$lib/shared/rangeUtil';
import type { PersonalData } from '$lib/shared/schema/server.types';
import { error } from '@sveltejs/kit';
import type { TableColumn, TableEntry } from '../view.types';

type JobsEntry = {
	name: string;
	id: string;
	day: Day;
	hour: number;
};

type GroupEntry = {
	name: string;
	id: string;
	day: Day;
	hours: number[];
};

function filterEntries(data: {
	[K: string]: PersonalData;
}): [JobsEntry[], JobsEntry[], JobsEntry[]] {
	const kuecheEntries: JobsEntry[] = [];
	const kioskEntries: JobsEntry[] = [];
	const okEntries: JobsEntry[] = [];

	Object.entries(data).forEach(([id, { name, timetable }]) => {
		timetable.forEach(({ ts: { day, hour, entry } }) => {
			if (entry.kueche) {
				kuecheEntries.push({
					name,
					id,
					day,
					hour,
				});
			}
			if (entry.kiosk) {
				kioskEntries.push({
					name,
					id,
					day,
					hour,
				});
			}
			if (entry.ok) {
				okEntries.push({
					name,
					id,
					day,
					hour,
				});
			}
		});
	});

	return [kuecheEntries, kioskEntries, okEntries];
}

function groupEntries(data: JobsEntry[]): GroupEntry[] {
	const byIds: { [id: string]: GroupEntry } = {};
	data.forEach((entry) => {
		const prev = byIds[entry.id];
		if (prev === undefined) {
			byIds[entry.id] = { day: entry.day, id: entry.id, name: entry.name, hours: [entry.hour] };
		} else {
			byIds[entry.id] = { ...prev, hours: [...prev.hours, entry.hour] };
		}
	});

	const groups: GroupEntry[] = [];
	Object.values(byIds).forEach((entry) => {
		const hours = entry.hours.sort();
		const hourGroups: number[][] = [];
		let currentGroup: number[] = [];
		let lastHour: number | null = null;

		hours.forEach((hour) => {
			if (lastHour === null) {
				currentGroup.push(hour);
			} else if (lastHour + 1 === hour) {
				currentGroup.push(hour);
			} else {
				hourGroups.push(currentGroup);
				currentGroup = [hour];
			}
			lastHour = hour;
		});
		hourGroups.push(currentGroup);
		hourGroups.forEach((group) => {
			groups.push({ ...entry, hours: group });
		});
	});
	return groups;
}

function mapToCols(data: GroupEntry[]): GroupEntry[][] {
	const cols: { usedHours: number[]; entries: GroupEntry[] }[] = [];
	data.forEach((entry) => {
		let foundSpace = false;
		cols.forEach((col) => {
			if (!entry.hours.some((hour) => col.usedHours.includes(hour)) && !foundSpace) {
				col.usedHours.push(...entry.hours);
				col.entries.push(entry);
				foundSpace = true;
			}
		});
		if (!foundSpace) {
			cols.push({ usedHours: [...entry.hours], entries: [entry] });
		}
	});
	return cols.map((col) => col.entries);
}

function mapToTableView(hour: number, group: GroupEntry[]): TableEntry {
	const entry = group.find((e) => e.hours.includes(hour));

	if (entry === undefined) {
		return {
			kind: 'empty',
			hour,
			rowspan: 1,
		};
	}
	const startHour = Math.min(...entry.hours);
	const duration = entry.hours.length;
	if (startHour === hour) {
		return {
			kind: 'filled',
			hour,
			rowspan: duration,
			id: entry.id,
			name: entry.name,
		};
	}
	return {
		kind: 'none',
		hour,
	};
}

function createTableView(groups: GroupEntry[][], day: Day, label: string): TableColumn {
	const dayHours = toRange(10, day === 'sa' ? 24 : 17);
	const cols = groups.map((group) => {
		return dayHours.range.map((hour) => mapToTableView(hour, group));
	});

	return {
		label,
		cols,
	};
}

export const load = async ({url}) => {
  const day = url.searchParams.get("day");
	const response = await loadAllProgram();
	if (!response.success) {
		throw error(400, 'Problem while computing and loading the data.');
	}
	const [kuecheEntries, kioskEntries, okEntries] = filterEntries(response.data);

	const kuecheSa = groupEntries(kuecheEntries.filter((e) => e.day === 'sa'));
	const kuecheSo = groupEntries(kuecheEntries.filter((e) => e.day === 'so'));
	const kioskSa = groupEntries(kioskEntries.filter((e) => e.day === 'sa'));
	const kioskSo = groupEntries(kioskEntries.filter((e) => e.day === 'so'));
	const okSa = groupEntries(okEntries.filter((e) => e.day === 'sa'));
	const okSo = groupEntries(okEntries.filter((e) => e.day === 'so'));

	const kuecheSaView = mapToCols(kuecheSa);
	const kuecheSoView = mapToCols(kuecheSo);
	const kioskSaView = mapToCols(kioskSa);
	const kioskSoView = mapToCols(kioskSo);
	const okSaView = mapToCols(okSa);
	const okSoView = mapToCols(okSo);

	const kuecheSaCol = createTableView(kuecheSaView, 'sa', 'Küche');
	const kuecheSoCol = createTableView(kuecheSoView, 'so', 'Küche');
	const kioskSaCol = createTableView(kioskSaView, 'sa', 'Kiosk');
	const kioskSoCol = createTableView(kioskSoView, 'so', 'Kiosk');
	const okSaCol = createTableView(okSaView, 'sa', 'OK');
	const okSoCol = createTableView(okSoView, 'so', 'OK');

	return {
		kuecheSaCol,
		kuecheSoCol,
		kioskSaCol,
		kioskSoCol,
		okSaCol,
		okSoCol,
    isSaturday: day !== "so",
    isSunday: day !== "sa",
	};
};
