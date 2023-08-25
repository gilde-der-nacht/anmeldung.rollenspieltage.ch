<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

{#if data.isPrint}
	<div class="main-wrapper print">
		<main class="primary-content content">
			<slot />
		</main>
	</div>
{:else}
	<Header />
	<div class="main-wrapper">
		<main class="primary-content content">
			<slot />
		</main>
	</div>
	<Footer />
{/if}


<style>
	.print .primary-content {
		inline-size: 100%;
	}
	.print.main-wrapper {
		background: white;
	}
</style>
