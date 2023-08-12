<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
</script>

<Header />
<div class="main-wrapper">
	<main class="primary-content content">
		<slot />
	</main>
</div>
<Footer />
