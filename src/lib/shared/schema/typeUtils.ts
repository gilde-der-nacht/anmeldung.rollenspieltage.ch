import type { z } from 'zod';
import type { AppState, ClientSaveState, Group } from './app';
import type { ServerData, ToSaveState, groupSchema } from './server';
import type { Day } from './shared';

export function convertForServer(appState: AppState): ToSaveState {
	return {
		registration_participant: appState.id,
		previous_registration_entry: appState.previous_registration_entry,
		name: appState.name,
		email: appState.email,
		age_group: appState.age_group,
		wants_to_help: appState.wants_to_help,
		group: [appState.group.one, appState.group.two],
		days: convertDaysForServer(appState.days),
	};
}

export function convertForClient(serverState: ServerData): ClientSaveState {
	return {
		name: serverState.name,
		email: serverState.email,
		age_group: serverState.age_group,
		wants_to_help: serverState.wants_to_help,
		group: convertGroupForClient(serverState.group),
		days: { saturday: serverState.days.includes("SATURDAY"), sunday: serverState.days.includes("SUNDAY") },
	};
}

export function convertGroupForClient(group: z.infer<typeof groupSchema>): Group {
	return {
		one: { ...group[0] },
		two: { ...group[1] },
	};
}

function convertDaysForServer({ saturday, sunday }: { saturday: boolean, sunday: boolean }): Day[] {
	const days: Day[] = [];
	if (saturday) {
		days.push("SATURDAY");
	}
	if (sunday) {
		days.push("SUNDAY");
	}
	return days;
}