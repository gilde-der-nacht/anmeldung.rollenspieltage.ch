<script lang="ts">
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
</script>

<Header />
<div class="main-wrapper">
	<main class="main-content content">
		<slot />
	</main>
</div>
<Footer />
