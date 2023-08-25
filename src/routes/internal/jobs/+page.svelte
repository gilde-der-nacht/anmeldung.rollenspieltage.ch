<script lang="ts">
	import InternalTable from '$lib/components/tables/InternalTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.isSaturday}
	<h1>Samstag</h1>
	<InternalTable tableData={[data.kuecheSaCol, data.kioskSaCol, data.okSaCol]} day="sa" />
{/if}

{#if data.isSunday}
	<h1>Sonntag</h1>
	<InternalTable tableData={[data.kuecheSoCol, data.kioskSoCol, data.okSoCol]} day="so" />
{/if}
