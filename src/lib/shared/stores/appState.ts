import { z } from 'zod';
import type { AppState } from '$lib/shared/schema/app';
import type { ServerData } from '$lib/shared/schema/server';
import type { Page } from '$lib/shared/schema/complex/navigation';
import { writable } from 'svelte/store';

export function initAppState(id: string, secret: string, page: Page, serverData: ServerData) {
	return writable<AppState>({
		...serverData,
		id: z.string().uuid().parse(id),
		secret: z.string().uuid().parse(secret),
		previous_registration_entry: z.string().uuid().parse(serverData.id),
		page,
	});
}

