import { z } from "zod";

export const pageList = [
    'kontaktperson',
    'gruppe',
    'zeit',
    'spielen',
    'leiten',
    'zusammenfassung',
] as const;
export const pageEnumSchema = z.enum(pageList);
export type Page = z.infer<typeof pageEnumSchema>;

export const pageMap: {
    [Property in Page]: {
        prev?: { page: Page; label: string };
        curr: { page: Page; label: string };
        next?: { page: Page; label: string };
    };
} = {
    kontaktperson: {
        curr: { page: pageEnumSchema.Enum.kontaktperson, label: 'Kontaktperson' },
        next: { page: pageEnumSchema.Enum.gruppe, label: 'Gruppe' },
    },
    gruppe: {
        prev: { page: pageEnumSchema.Enum.kontaktperson, label: 'Kontaktperson' },
        curr: { page: pageEnumSchema.Enum.gruppe, label: 'Gruppe' },
        next: { page: pageEnumSchema.Enum.zeit, label: 'Zeit' },
    },
    zeit: {
        prev: { page: pageEnumSchema.Enum.gruppe, label: 'Gruppe' },
        curr: { page: pageEnumSchema.Enum.zeit, label: 'Zeit' },
        next: { page: pageEnumSchema.Enum.spielen, label: 'Spielen' },
    },
    spielen: {
        prev: { page: pageEnumSchema.Enum.zeit, label: 'Zeit' },
        curr: { page: pageEnumSchema.Enum.spielen, label: 'Spielen' },
        next: { page: pageEnumSchema.Enum.leiten, label: 'Spiel Leiten' },
    },
    leiten: {
        prev: { page: pageEnumSchema.Enum.spielen, label: 'Spielen' },
        curr: { page: pageEnumSchema.Enum.leiten, label: 'Spiel Leiten' },
        next: { page: pageEnumSchema.Enum.zusammenfassung, label: 'Zusammenfassung' },
    },
    zusammenfassung: {
        prev: { page: pageEnumSchema.Enum.leiten, label: 'Spiel Leiten' },
        curr: { page: pageEnumSchema.Enum.zusammenfassung, label: 'Zusammenfassung' },
    },
};