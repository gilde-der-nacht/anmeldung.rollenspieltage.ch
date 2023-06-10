import type { z } from 'zod';
import type { AppState, ClientSaveState, Group } from './app';
import type { ServerData, ServerGroup, ToSaveState, groupSchema } from './server';
import type { Day } from './shared';

export function convertForServer(appState: AppState): ToSaveState {
	return {
		registration_participant: appState.id,
		previous_registration_entry: appState.previous_registration_entry,
		name: appState.name,
		email: appState.email,
		age_group: appState.age_group,
		wants_to_help: appState.wants_to_help,
		group: convertGroupForServer(appState.group),
		days: convertDaysForServer(appState.days),
		sunday_starttime: appState.sunday_starttime,
		saturday_endtime: appState.saturday_endtime,
		saturday_starttime: appState.saturday_starttime,
		sunday_endtime: appState.sunday_endtime,
	};
}

export function convertForClient(serverState: ServerData): ClientSaveState {
	return {
		name: serverState.name,
		email: serverState.email,
		age_group: serverState.age_group,
		wants_to_help: serverState.wants_to_help,
		group: convertGroupForClient(serverState.group),
		days: {
			saturday: serverState.days.includes("SATURDAY"),
			sunday: serverState.days.includes("SUNDAY")
		},
		sunday_starttime: serverState.sunday_starttime,
		saturday_endtime: serverState.saturday_endtime,
		saturday_starttime: serverState.saturday_starttime,
		sunday_endtime: serverState.sunday_endtime,
	};
}

export function convertGroupForServer(group: Group): ServerGroup {
	const daysOne: Day[] = []
	if (group.one.days.saturday) {
		daysOne.push("SATURDAY");
	}
	if (group.one.days.sunday) {
		daysOne.push("SUNDAY");
	}

	const daysTwo: Day[] = []
	if (group.two.days.saturday) {
		daysTwo.push("SATURDAY");
	}
	if (group.two.days.sunday) {
		daysTwo.push("SUNDAY");
	}

	return [
		{
			...group.one,
			days: daysOne
		}, {
			...group.two,
			days: daysTwo
		},
	]

}

export function convertGroupForClient(group: ServerGroup): Group {
	return {
		one: {
			...group[0], days: {
				saturday: group[0].days.includes("SATURDAY"),
				sunday: group[0].days.includes("SUNDAY"),
			}
		},
		two: {
			...group[1], days: {
				saturday: group[0].days.includes("SATURDAY"),
				sunday: group[0].days.includes("SUNDAY"),
			}
		},
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