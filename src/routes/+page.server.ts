import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');

		if (name === null || typeof name !== 'string' || name.trim().length === 0) {
			return fail(400, { name, email, invalidName: true });
		}

		if (email === null || typeof email !== 'string' || email.trim().length === 0) {
			return fail(400, { name, email, invalidMail: true });
		}
		const secret = crypto.randomUUID();
		const body = { name, email, secret };
		const headers = { 'Content-Type': 'application/json' };

		const res = await fetch('https://olymp.gildedernacht.ch/items/participant_23', {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			return fail(res.status, { name, email, serverError: true });
		}

		const itemSchema = z.object({
			data: z.object({ id: z.string() }),
		});
		const parsed = itemSchema.safeParse((await res.json()) as unknown);

		if (!parsed.success) {
			return fail(res.status, { name, email, serverError: true });
		}

		throw redirect(300, parsed.data.data.id + '?secret=' + secret);
	},
} satisfies Actions;
