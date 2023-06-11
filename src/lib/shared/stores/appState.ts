import { writable } from 'svelte/store';
import { z } from 'zod';
import type { AppState } from '../schema/app';
import type { ServerData } from '../schema/server';
import type { Page } from '../schema/complex/navigation';

export function initAppState(id: string, secret: string, page: Page, serverData: ServerData) {

	const appState = writable<AppState>({
		...serverData,
		id: z.string().uuid().parse(id),
		secret: z.string().uuid().parse(secret),
		previous_registration_entry: z.string().uuid().parse(serverData.id),
		page,
	});
	return appState;
}
