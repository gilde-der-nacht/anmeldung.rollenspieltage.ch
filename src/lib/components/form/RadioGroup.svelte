<script lang="ts">
	type RadioOption = {
		value: string;
		label: string;
	};
	export let label: string;
	export let options: RadioOption[];
	export let value: string;
</script>

<fieldset>
	<legend>{label}</legend>
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<ul role="list" class="radio-list">
		{#each options as option}
			<li>
				<label class="input-radio">
					<input type="radio" value={option.value} bind:group={value} />
					{option.label}
				</label>
			</li>
		{/each}
	</ul>
</fieldset>
