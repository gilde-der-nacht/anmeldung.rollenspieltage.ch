import { writable } from 'svelte/store';
import { z } from 'zod';
import type { AppState, Page } from '../schema/app';
import type { ServerData } from '../schema/server';
import { convertGroupForClient } from '../schema/typeUtils';

export function initAppState(id: string, secret: string, page: Page, serverData: ServerData) {
	const appState = writable<AppState>({
		id: z.string().uuid().parse(id),
		secret: z.string().uuid().parse(secret),
		previous_registration_entry: z.string().uuid().parse(serverData.id),
		name: serverData.name,
		email: serverData.email,
		age_group: serverData.age_group,
		wants_to_help: serverData.wants_to_help,
		group: convertGroupForClient(serverData.group),
		page,
	});
	return appState;
}
