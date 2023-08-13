<script lang="ts">
	import { convertToTableView } from '$lib/client/utils';
	import type { Range } from '$lib/shared/rangeUtil';
	import type { DayProgramWebData } from '$lib/shared/schema/web.types';
	import Table from './Table.svelte';

	export let data: DayProgramWebData;
	export let range: Range;
	export let name: string;
	const tableData = convertToTableView(data, range, 'sa', name);
</script>

<Table data={tableData} />
