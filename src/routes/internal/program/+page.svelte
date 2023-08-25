<script lang="ts">
	import InternalTable from '$lib/components/tables/InternalTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Samstag</h1>
<InternalTable tableData={[data.gamesSaCol]} day="sa" />

<h1>Sonntag</h1>
<InternalTable tableData={[data.gamesSoCol]} day="so" />
