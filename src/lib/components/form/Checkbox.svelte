<script lang="ts">
	import FormFieldError from './FormFieldError.svelte';

	export let state: boolean;
	export let error: { condition: () => boolean; message: string } | undefined = undefined;
</script>

<label class="input-checkbox">
	<input type="checkbox" bind:checked={state} />
	<slot />
</label>

{#if error !== undefined && error.condition()}
	<FormFieldError>{error.message}</FormFieldError>
{/if}
