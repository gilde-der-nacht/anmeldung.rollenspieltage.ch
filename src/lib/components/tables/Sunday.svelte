<script lang="ts">
	import { convertToTableView } from '$lib/client/utils';
	import type { DayProgramWebData } from '$lib/shared/schema/web.types';
	import Table from './Table.svelte';

	export let data: DayProgramWebData;
	export let name: string;
	const tableData = convertToTableView(data, 'so', name);
</script>

<Table data={tableData} />
