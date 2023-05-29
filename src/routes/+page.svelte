<script lang="ts">
	import Alert from '$lib/common/Alert.svelte';
	import Button from '$lib/form/Button.svelte';
	import EmailInput from '$lib/form/EmailInput.svelte';
	import TextInput from '$lib/form/TextInput.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import ServerErrorAlert from '$lib/common/ServerErrorAlert.svelte';
	import Loader from '$lib/common/Loader.svelte';

	export let form: ActionData;
	let nameErrorMsg: string | undefined;
	let emailErrorMsg: string | undefined;

	$: {
		nameErrorMsg = form?.errors?.find((e) => e.field === 'name')?.message;
		emailErrorMsg = form?.errors?.find((e) => e.field === 'email')?.message;
	}

	let loading: boolean = false;
</script>

<h1>Anmeldung</h1>
<p>Melde dich jetzt für die Luzerner Rollenspieltage 2023 an.</p>

{#if form?.serverError}
	<ServerErrorAlert />
{/if}

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	}}
	novalidate
>
	<TextInput
		initValue={typeof form?.name === 'string' ? form.name : ''}
		label="Name"
		name="name"
		required
	/>
	{#if nameErrorMsg !== undefined}
		<Alert type="danger">
			{nameErrorMsg}
		</Alert>
	{/if}
	<EmailInput
		initValue={typeof form?.email === 'string' ? form.email : ''}
		label="E-Mail-Adresse"
		name="email"
		required
	/>
	{#if emailErrorMsg !== undefined}
		<Alert type="danger">
			{emailErrorMsg}
		</Alert>
	{/if}
	{#if loading}
		<Button type="submit" kind="gray" disabled><Loader /> Anmeldung wird gestartet ...</Button>
	{:else}
		<Button type="submit">Anmeldung starten</Button>
	{/if}
</form>
