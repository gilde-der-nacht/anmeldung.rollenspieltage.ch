<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const single = data.program.people.group.length === 0;
</script>

{#if single}
	<h1 id="main-title">Dein persönliches Programm</h1>
{:else}
	<h1 id="main-title">Euer persönliches Programm</h1>
{/if}
<p>Luzerner Rollenspieltage 2023</p>
