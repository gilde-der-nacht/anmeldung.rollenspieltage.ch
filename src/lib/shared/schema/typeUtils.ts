import type { AppState, ClientSaveState, Group } from './app';
import type { ServerGroup } from './complex/companionSchema';
import type { SaveSchema } from './complex/saveSchema';
import type { Day } from './enums';

export function convertForServer(appState: AppState): SaveSchema {
	return {
		...appState,
		group: convertGroupForServer(appState.group),
		days: convertDaysForServer(appState.days),
	};
}

export function convertForClient(serverState: SaveSchema): ClientSaveState {
	return {
		...serverState,
		group: convertGroupForClient(serverState.group),
		days: {
			saturday: serverState.days.includes("SATURDAY"),
			sunday: serverState.days.includes("SUNDAY")
		},
		game_rounds: serverState.game_rounds ?? []
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
	const first = group[0];
	const second = group[1];
	if (first === undefined || second === undefined) {
		throw new Error("This should not happen 2382.");
	}

	return {
		one: {
			...first, days: {
				saturday: first.days.includes("SATURDAY"),
				sunday: first.days.includes("SUNDAY"),
			}
		},
		two: {
			...second, days: {
				saturday: second!.days.includes("SATURDAY"),
				sunday: second!.days.includes("SUNDAY"),
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