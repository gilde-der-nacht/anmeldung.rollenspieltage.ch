<script lang="ts">
	import Alert from '$lib/components/common/Alert.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
</script>

<Header />
<div class="main-wrapper">
	<main class="primary-content content">
		<!-- <Alert type="danger">Diese Webseite ist noch im Aufbau. Bitte noch nicht ausfüllen.</Alert> -->
		<slot />
	</main>
</div>
<Footer />
