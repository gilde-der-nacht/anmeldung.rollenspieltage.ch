<script lang="ts">
	import Alert from '$lib/components/common/Alert.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import EmailInput from '$lib/components/form/EmailInput.svelte';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import ServerErrorAlert from '$lib/components/common/ServerErrorAlert.svelte';
	import Loader from '$lib/components/common/Loader.svelte';
	import { goto } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';

	export let form: ActionData;

	$: nameErrorMsg = form?.errors?.find((e) => e.field === 'name')?.message;
	$: emailErrorMsg = form?.errors?.find((e) => e.field === 'email')?.message;

	let loading: boolean = false;
	let initSuccess: boolean = false;

	const formSubmitEnhanced = () => {
		loading = true;
		return async ({ result }: { result: ActionResult }) => {
			if (result.type !== 'success') {
				if ('data' in result && result.data !== undefined) {
					form = result.data as ActionData;
				}
				loading = false;
			} else {
				initSuccess = true;
				goto(`/${result.data?.id}?secret=${result.data?.secret}&created=true`);
			}
		};
	};
</script>

<h1>Anmeldung 2023</h1>
<p>Melde dich jetzt für die Luzerner Rollenspieltage 2023 an.</p>

{#if form?.serverError}
	<ServerErrorAlert />
{/if}

<form method="POST" use:enhance={formSubmitEnhanced} novalidate>
	<TextInput
		value={typeof form?.name === 'string' ? form.name : ''}
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

	<Button
		type="submit"
		kind={!loading && !initSuccess ? 'accent' : 'gray'}
		disabled={loading || initSuccess}>Anmeldung starten</Button
	>
	{#if initSuccess}
		<span style="margin-inline-start: 1rem;">
			<Loader />
			Erfolg, du wirst demnächst weitergeleitet ...
		</span>
	{:else if loading}
		<span style="margin-inline-start: 1rem;">
			<Loader />
			Anmeldung wird gestartet ...
		</span>
	{/if}
</form>
