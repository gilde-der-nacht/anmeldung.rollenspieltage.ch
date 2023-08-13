<script lang="ts">
	import type { z } from 'zod';
	import Table from './Table.svelte';
	import { prepareForView, type TableView } from './util';

	export let sundayData: z.infer<typeof daySchemaSunday>;
	const data: TableView[] = prepareForView(toRange(10, 18), sundayData);
</script>

<Table {data} />
