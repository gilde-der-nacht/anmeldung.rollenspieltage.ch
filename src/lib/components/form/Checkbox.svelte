<script lang="ts">
	import FormFieldError from '$lib/components/form/FormFieldError.svelte';

	export let state: boolean;
	export let disabled: boolean = false;
	export let error: { condition: () => boolean; message: string } | undefined = undefined;
</script>

<label class="input-checkbox">
	<input type="checkbox" bind:checked={state} {disabled} />
	<slot />
</label>

{#if error !== undefined && error.condition()}
	<FormFieldError>{error.message}</FormFieldError>
{/if}
