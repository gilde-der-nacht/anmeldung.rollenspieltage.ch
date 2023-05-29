import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { OLYMP } from '$lib/Constants';
import { z } from 'zod';

type Error = { field: string; message: string };

const nameSchema = z.string().trim().min(1);
const emailSchema = z.string().trim().email();
const itemSchema = z.object({
	data: z.object({ id: z.string() }),
});

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

		console.log('failed?', errors);

		if (errors.length > 0) {
			return fail(400, { name, email, errors });
		}

		const secret = crypto.randomUUID();
		const body = { name, email, secret };
		const headers = { 'Content-Type': 'application/json' };

		const res = await fetch(OLYMP + '/items/participant_23', {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			return fail(res.status, { name, email, serverError: true });
		}

		const parsed = itemSchema.safeParse((await res.json()) as unknown);

		if (!parsed.success) {
			return fail(res.status, { name, email, serverError: true });
		}

		throw redirect(300, parsed.data.data.id + '?secret=' + secret + '&created=true');
	},
} satisfies Actions;
