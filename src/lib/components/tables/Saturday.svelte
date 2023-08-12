<script lang="ts">
	import type { daySchemaGeneral, daySchemaSaturday, hourSchema } from '$lib/shared/schema/server';
	import type { z } from 'zod';
	import Table from './Table.svelte';
	import { prepareForView, type TableView } from './util';
	import { toRange } from '$lib/shared/rangeUtil';

	export let saturdayData: z.infer<typeof daySchemaSaturday>;
	const data: TableView[] = prepareForView(toRange(10, 24), saturdayData);
</script>

<Table {data} />
