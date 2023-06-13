<script lang="ts">
	import FormFieldError from '$lib/components/form/FormFieldError.svelte';

	export let label: string;
	export let name: string;
	export let value: number = 0;
	export let placeholder: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let error: { condition: () => boolean; message: string } | undefined = undefined;
</script>

<div>
	<label
		>{label} <input type="number" bind:value min="1" {name} {placeholder} {required} {disabled} />
	</label>

	{#if error !== undefined && error.condition()}
		<FormFieldError>{error.message}</FormFieldError>
	{/if}
</div>
