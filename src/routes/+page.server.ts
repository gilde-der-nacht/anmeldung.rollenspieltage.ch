import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { emailSchema, nameSchema } from '$lib/api/schema';
import { initializeRegistration } from '$lib/api/methods/initialize';

type Error = { field: string; message: string };

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const parsedName = nameSchema.safeParse(name);
		const parsedEmail = emailSchema.safeParse(email);
		const errors: Error[] = [];

		if (!parsedName.success) {
			errors.push({ field: 'name', message: "Das Feld 'Name' darf nicht leer sein." });
		}

		if (!parsedEmail.success) {
			errors.push({ field: 'email', message: "Das Feld 'E-Mail-Adresse' ist invalid." });
		}

		if (!parsedName.success || !parsedEmail.success) {
			return fail(400, { name, email, errors });
		}

		const res = await initializeRegistration(parsedName.data, parsedEmail.data);

		if (!res.success) {
			return fail(res.status, { name, email, serverError: true });
		}

		return res;
	},
} satisfies Actions;
