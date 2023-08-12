<script lang="ts">
	import type { daySchemaGeneral, daySchemaSaturday, hourSchema } from '$lib/shared/schema/server';
	import type { z } from 'zod';
	import Table from './Table.svelte';

	export let saturdayData: z.infer<typeof daySchemaSaturday>;
	const data: z.infer<typeof daySchemaGeneral> = (function () {
		const map = new Map<number, z.infer<typeof hourSchema>>();
		Object.entries(saturdayData).forEach(([index, value]) => {
			map.set(Number(index), value);
		});
		return map;
	})();
</script>

<Table {data} />
