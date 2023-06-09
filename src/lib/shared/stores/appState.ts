import { writable } from 'svelte/store';
import { z } from 'zod';
import type { AppState, Page } from '../schema/app';
import type { ServerData } from '../schema/server';
import { convertForClient } from '../schema/typeUtils';

export function initAppState(id: string, secret: string, page: Page, serverData: ServerData) {
	const converted = convertForClient(serverData);

	const appState = writable<AppState>({
		id: z.string().uuid().parse(id),
		secret: z.string().uuid().parse(secret),
		previous_registration_entry: z.string().uuid().parse(serverData.id),
		name: converted.name,
		email: converted.email,
		age_group: converted.age_group,
		wants_to_help: converted.wants_to_help,
		group: converted.group,
		days: converted.days,
		page,
	});
	return appState;
}
