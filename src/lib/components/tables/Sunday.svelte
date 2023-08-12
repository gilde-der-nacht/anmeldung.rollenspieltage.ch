<script lang="ts">
	import type { daySchemaGeneral, daySchemaSunday, hourSchema } from '$lib/shared/schema/server';
	import type { z } from 'zod';
	import Table from './Table.svelte';

	export let sundayData: z.infer<typeof daySchemaSunday>;
	const data: z.infer<typeof daySchemaGeneral> = (function () {
		const map = new Map<number, z.infer<typeof hourSchema>>();
		Object.entries(sundayData).forEach(([index, value]) => {
			map.set(Number(index), value);
		});
		return map;
	})();
</script>

<Table {data} />
