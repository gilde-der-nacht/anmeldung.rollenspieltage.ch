<script lang="ts">
	import { pages, type Page, type AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';

	export let appState: Writable<AppState>;
	$: currentPage = $appState.page;
</script>

<h3>Navigation</h3>
<ul class="steps">
	<li class="steps-segment">
		<span class="steps-marker" />
		<div class="steps-content">
			<button
				class={`link ${currentPage === pages.Enum.kontaktperson ? 'active' : ''}`}
				on:click={() => appState.update((prev) => ({ ...prev, page: pages.Enum.kontaktperson }))}
				>Kontaktperson</button
			>
		</div>
	</li>
	<li class="steps-segment">
		<span class="steps-marker" />
		<div class="steps-content">
			<button
				class={`link ${currentPage === pages.Enum.gruppe ? 'active' : ''}`}
				on:click={() => appState.update((prev) => ({ ...prev, page: pages.Enum.gruppe }))}
				>Gruppe</button
			>
		</div>
	</li>
	<li class="steps-segment">
		<span class="steps-marker" />
		<div class="steps-content">
			<button
				class={`link ${currentPage === pages.Enum.zeit ? 'active' : ''}`}
				on:click={() => appState.update((prev) => ({ ...prev, page: pages.Enum.zeit }))}
				>Zeit</button
			>
		</div>
	</li>
	<li class="steps-segment">
		<span class="steps-marker" />
		<div class="steps-content">
			<button
				class={`link ${currentPage === pages.Enum.spielen ? 'active' : ''}`}
				on:click={() => appState.update((prev) => ({ ...prev, page: pages.Enum.spielen }))}
				>Spielen</button
			>
		</div>
	</li>
	<li class="steps-segment">
		<span class="steps-marker" />
		<div class="steps-content">
			<button
				class={`link ${currentPage === pages.Enum.leiten ? 'active' : ''}`}
				on:click={() => appState.update((prev) => ({ ...prev, page: pages.Enum.leiten }))}
			>
				Spiel Leiten
			</button>
		</div>
	</li>
	<li class="steps-segment">
		<span class="steps-marker" />
		<div class="steps-content">
			<button
				class={`link ${currentPage === pages.Enum.zusammenfassung ? 'active' : ''}`}
				on:click={() => appState.update((prev) => ({ ...prev, page: pages.Enum.zusammenfassung }))}
				>Zusammenfassung</button
			>
		</div>
	</li>
</ul>

<style>
	.steps {
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 0.75rem;
		margin-top: 2rem;
	}

	@media (min-width: 1000px) {
		.steps {
			position: sticky;
			top: 150px;
		}
	}

	.steps-segment {
		display: block;
		position: relative;
	}

	.steps-segment:not(:last-child) {
		min-height: 4em;
	}

	.steps-segment:not(:last-child)::after {
		bottom: -0.24rem;
		left: calc(0.75rem - (0.1em));
		top: 1.26rem;
		width: 0.2em;
		content: ' ';
		display: block;
		position: absolute;
	}

	.steps-segment::after {
		background-color: var(--clr-11);
	}

	.steps-marker {
		height: 1.5rem;
		width: 1.5rem;
		background-color: var(--clr-11);
		color: lightgrey;
		align-items: center;
		display: flex;
		border-radius: 50%;
		font-weight: 700;
		justify-content: center;
		position: relative;
		z-index: 10;
	}

	.steps-content {
		margin-left: calc(1rem + 0.5em);
		margin-top: -2rem;
		padding-left: 1em;
		padding-bottom: 1em;
	}

	.link {
		border-left-width: 0;
		border-right-width: 0;
		border-top-width: 0;
		background-color: transparent;
	}

	.active {
		border-bottom-color: var(--clr-accent-1);
		color: var(--clr-accent-2);
	}
</style>
