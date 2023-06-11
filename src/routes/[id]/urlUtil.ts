import { pageEnumSchema } from '$lib/shared/schema/complex/navigation';
import type { AppState } from '$lib/shared/schema/app';
import type { Writable } from 'svelte/store';

export const removeCreated = () => {
	const url = new URL(location.href);
	url.searchParams.delete('created');
	history.replaceState(false, '', url);
};

const PAGE_PARAM = 'page' as const;

export const updateUrl = (appState: Writable<AppState>) => () => {
	const url = new URL(location.href);
	const page = url.searchParams.get(PAGE_PARAM);
	const parsed = pageEnumSchema.safeParse(page);
	if (parsed.success) {
		appState.update((prev) => ({ ...prev, page: parsed.data }));
	}
	appState.subscribe((state) => {
		const url = new URL(location.href);
		const page = url.searchParams.get(PAGE_PARAM);
		const parsed = pageEnumSchema.safeParse(page);
		if (!parsed.success || parsed.data !== state.page) {
			url.searchParams.set(PAGE_PARAM, state.page);
			history.replaceState(state.page, '', url);
		}
	});
};
