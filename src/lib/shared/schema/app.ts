import { z } from 'zod';

const clientSaveState = z.object({
	name: z.string(),
	email: z.string(),
	wants_to_help: z.boolean(),
	name_friend_one: z.string(),
	name_friend_two: z.string(),
});
export type ClientSaveState = z.infer<typeof clientSaveState>;

export const pages = [
	'kontaktperson',
	'gruppe',
	'zeit',
	'spielen',
	'leiten',
	'zusammenfassung',
] as const;
export const pageEnum = z.enum(pages);
export type Page = z.infer<typeof pageEnum>;
export const pageMap: {
	[Property in Page]: {
		prev?: { page: Page; label: string };
		curr: { page: Page; label: string };
		next?: { page: Page; label: string };
	};
} = {
	kontaktperson: {
		curr: { page: pageEnum.Enum.kontaktperson, label: 'Kontaktperson' },
		next: { page: pageEnum.Enum.gruppe, label: 'Gruppe' },
	},
	gruppe: {
		prev: { page: pageEnum.Enum.kontaktperson, label: 'Kontaktperson' },
		curr: { page: pageEnum.Enum.gruppe, label: 'Gruppe' },
		next: { page: pageEnum.Enum.zeit, label: 'Zeit' },
	},
	zeit: {
		prev: { page: pageEnum.Enum.gruppe, label: 'Gruppe' },
		curr: { page: pageEnum.Enum.zeit, label: 'Zeit' },
		next: { page: pageEnum.Enum.spielen, label: 'Spielen' },
	},
	spielen: {
		prev: { page: pageEnum.Enum.zeit, label: 'Zeit' },
		curr: { page: pageEnum.Enum.spielen, label: 'Spielen' },
		next: { page: pageEnum.Enum.leiten, label: 'Spiel Leiten' },
	},
	leiten: {
		prev: { page: pageEnum.Enum.spielen, label: 'Spielen' },
		curr: { page: pageEnum.Enum.leiten, label: 'Spiel Leiten' },
		next: { page: pageEnum.Enum.zusammenfassung, label: 'Zusammenfassung' },
	},
	zusammenfassung: {
		prev: { page: pageEnum.Enum.leiten, label: 'Spiel Leiten' },
		curr: { page: pageEnum.Enum.zusammenfassung, label: 'Zusammenfassung' },
	},
};

export const appStateSchema = clientSaveState.extend({
	id: z.string().uuid(),
	secret: z.string().uuid(),
	previous_registration_entry: z.string().uuid(),
	page: pageEnum,
});
export type AppState = z.infer<typeof appStateSchema>;
