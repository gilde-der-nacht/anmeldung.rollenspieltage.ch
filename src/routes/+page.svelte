<script lang="ts">
	import Alert from '$lib/common/Alert.svelte';
	import Button from '$lib/form/Button.svelte';
	import EmailInput from '$lib/form/EmailInput.svelte';
	import TextInput from '$lib/form/TextInput.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import ServerErrorAlert from '$lib/common/ServerErrorAlert.svelte';

	export let form: ActionData;
</script>

<h1>Anmeldung</h1>
<p>Melde dich jetzt für die Luzerner Rollenspieltage 2023 an.</p>

{#if form?.invalidName || form?.invalidMail}
	<Alert>
		{#if form?.invalidName}
			<p>Das Feld 'Name' ist ungültig.</p>
		{:else if form?.invalidMail}
			<p>Das Feld 'E-Mail-Adresse' ist ungültig.</p>
         
		{/if}
	</Alert>
{/if}

{#if form?.serverError}
<ServerErrorAlert/>
{/if}

<form method="POST" use:enhance>
	<TextInput
		initValue={typeof form?.name === 'string' ? form.name : ''}
		label="Name"
		name="name"
		required
	/>
	<EmailInput
		initValue={typeof form?.email === 'string' ? form.email : ''}
		label="E-Mail-Adresse"
		name="email"
		required
	/>
	<Button label="Anmeldung starten" type="submit" />
</form>
