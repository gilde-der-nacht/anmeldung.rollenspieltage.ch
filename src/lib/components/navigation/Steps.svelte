<script lang="ts">
	import {
		goToPage,
		pageList,
		pageMap,
		type PageState,
	} from '$lib/shared/schema/complex/navigation';
	import type { AppState } from '$lib/shared/schema/app';
	import { get, type Writable } from 'svelte/store';
	import StepIcon from './StepIcon.svelte';
	import { validateState } from '$lib/shared/validation';

	export let appState: Writable<AppState>;
	$: currentPage = $appState.page;
	$: v = validateState($appState);
	$: contactPageState = (
		!get(appState).visited_pages.includes('CONTACT') ? 'TODO' : v.contact.all ? 'ERRORS' : 'DONE'
	) as PageState;
	$: groupPageState = (
		!get(appState).visited_pages.includes('GROUP') ? 'TODO' : v.group.all ? 'ERRORS' : 'DONE'
	) as PageState;
	$: timePageState = (
		!get(appState).visited_pages.includes('TIME') ? 'TODO' : v.time.GENERAL ? 'ERRORS' : 'DONE'
	) as PageState;
	$: playPageState = (
		!get(appState).visited_pages.includes('PLAY') ? 'TODO' : v.genres ? 'ERRORS' : 'DONE'
	) as PageState;
	$: masterPageState = (
		!get(appState).visited_pages.includes('MASTER') ? 'TODO' : v.gameRounds ? 'ERRORS' : 'DONE'
	) as PageState;
	$: summaryPageState = !get(appState).visited_pages.includes('SUMMARY')
		? 'TODO'
		: v.generel
		? 'ERRORS'
		: ('DONE' as PageState);
</script>

<h4>Navigation</h4>
<ul class="steps">
	{#each pageList as page}
		{@const curr = pageMap[page].curr}
		{@const state =
			page === 'kontaktperson'
				? contactPageState
				: page === 'gruppe'
				? groupPageState
				: page === 'zeit'
				? timePageState
				: page === 'spielen'
				? playPageState
				: page === 'leiten'
				? masterPageState
				: summaryPageState}
		<li class={`steps-segment ${currentPage === curr.page ? 'active' : ''} ${state}`}>
			<span class="steps-marker">
				<StepIcon type={state} />
			</span>
			<div class="steps-content">
				<button
					class={`link ${currentPage === curr.page ? 'active' : ''}`}
					on:click={() => goToPage(curr.page, appState)}
				>
					{curr.label}
				</button>
			</div>
		</li>
	{/each}
</ul>

<style>
	.steps {
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 0.75rem;
		margin-top: 2rem;
		padding-inline-start: 0.5rem;
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
		overflow: visible;
	}

	.active > .steps-marker {
		outline: 3px solid var(--clr-accent-1);
		outline-offset: 0.25rem;
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

	.TODO .steps-marker,
	.TODO.steps-segment::after {
		background-color: var(--clr-gray-10);
	}

	.DONE .steps-marker,
	.DONE.steps-segment::after {
		background-color: var(--clr-success-10);
	}

	.ERRORS .steps-marker,
	.ERRORS.steps-segment::after {
		background-color: var(--clr-danger-8);
	}
</style>
