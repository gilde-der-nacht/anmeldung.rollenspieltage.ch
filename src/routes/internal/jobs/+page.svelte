<script lang="ts">
	import InternalTable from '$lib/components/tables/InternalTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<InternalTable tableData={[
	data.kuecheSaCol,
	 data.kioskSaCol,
	  data.okSaCol
		]} day="sa" />

