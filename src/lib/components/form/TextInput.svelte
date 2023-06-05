<script lang="ts">
	import FormFieldError from './FormFieldError.svelte';

	export let label: string;
	export let name: string;
	export let initValue: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let error: { condition: () => boolean; message: string } | undefined = undefined;
</script>

<div>
	<label
		>{label} <input type="text" bind:value={initValue} {name} {placeholder} {required} />
	</label>

	{#if error !== undefined && error.condition()}
		<FormFieldError>{error.message}</FormFieldError>
	{/if}
</div>
