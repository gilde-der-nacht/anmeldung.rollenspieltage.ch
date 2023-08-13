<script lang="ts">
	import { renderNamesList } from '$lib/client/utils';
	import Alert from '$lib/components/common/Alert.svelte';
	import Saturday from '$lib/components/tables/Saturday.svelte';
	import Sunday from '$lib/components/tables/Sunday.svelte';
	import { toRange } from '$lib/shared/rangeUtil';
	import type { PageData } from './$types';

	export let data: PageData;
	const people = Array.from(
		new Set([data.webData.name, ...data.webData.companions_sa, ...data.webData.companions_so]),
	);
	const single = people.length === 1;
</script>

{#if single}
	<h1 id="main-title">Dein persönliches Programm</h1>
{:else}
	<h1 id="main-title">Euer persönliches Programm</h1>
{/if}
<h2 class="mt-0">Luzerner Rollenspieltage 2023</h2>

<p class="mt-3">
	Es folgt das persönliche Programm für{' '}
	<strong>{renderNamesList(people)}</strong>.
</p>

<div class="mb-5">
	<Alert>
		{single ? 'Kommst du' : 'Kommt ihr'} verspätet oder{' '}
		{single ? 'kannst du' : 'könnt ihr'} gar nicht teilnehmen (Krankheit, Stau etc.), sendet uns doch
		bitte eine Nachricht{' '}
		<a href="https://rollenspieltage.ch/kontakt/"> per Kontaktformular </a>
		.
	</Alert>
</div>

<h4 class="mt-3">Samstag, 26. August 2023</h4>

{#if data.webData.program.sa === null}
	<Alert>Samstag wurde nicht ausgewählt.</Alert>
{:else}
	<Saturday
		data={data.webData.program.sa}
		name={data.webData.name}
		range={toRange(data.timeData.saturday_starttime ?? 10, data.timeData.saturday_endtime ?? 24)}
	/>
{/if}

<h4 class="mt-3">Sonntag, 27. August 2023</h4>

{#if data.webData.program.so === null}
	<Alert>Sonntag wurde nicht ausgewählt.</Alert>
{:else}
	<Sunday
		data={data.webData.program.so}
		name={data.webData.name}
		range={toRange(data.timeData.sunday_starttime ?? 10, data.timeData.sunday_endtime ?? 24)}
	/>
{/if}

<p class="mt-5">Wir freuen uns auf {single ? 'dich' : 'euch'}.</p>
<p>
	Lieben Gruss
	<br />
	Thomas, Adrian, Michelle und Oliver
	<br />
	<strong>OK Luzerner Rollenspieltage 2023</strong>
</p>

<style>
	.mt-0 {
		margin-block-start: 0;
	}

	.mt-3 {
		margin-block-start: 1.5rem;
	}

	.mt-5 {
		margin-block-start: 3rem;
	}

	.mb-5 {
		margin-block-end: 3rem;
	}
</style>
