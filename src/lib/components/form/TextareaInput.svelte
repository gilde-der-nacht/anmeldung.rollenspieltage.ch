<script lang="ts">
	import FormFieldError from '$lib/components/form/FormFieldError.svelte';

	export let label: string;
	export let name: string;
	export let value: string | null = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let error: { condition: () => boolean; message: string | string[] } | undefined =
		undefined;
</script>

<div>
	<label>{label} <textarea bind:value {name} {placeholder} {required} {disabled} /> </label>

	{#if error !== undefined && error.condition()}
		<FormFieldError>
			{#if typeof error.message === 'string'}
				{error.message}
			{:else}
				{#each error.message as e}
					<p>{e}</p>
				{/each}
			{/if}
		</FormFieldError>
	{/if}
</div>
