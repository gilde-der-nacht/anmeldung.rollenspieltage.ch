import { z } from "zod";

export const roundDataSchema = z.object({
	id: z.string(),
	name: z.string(),
	system: z.nullable(z.string()),
	game_master: z.string(),
	players: z.array(z.string()),
	max_players: z.number(),
});

export type RoundData = z.infer<typeof roundDataSchema>;

export const entryDataSchema = z.object({
	ok: z.boolean(),
	kueche: z.boolean(),
	kiosk: z.boolean(),
	gamemaster: z.nullable(roundDataSchema),
	player: z.nullable(roundDataSchema),
});

export type EntryData = z.infer<typeof entryDataSchema>;

export const timetableDataSchema = z.object({
	ts: z.object({
		day: z.enum(["sa", "so"]),
		hour: z.number(),
		entry: entryDataSchema,
	})
});

export type TimetableData = z.infer<typeof timetableDataSchema>;

export const personalDataSchema = z.object({
	name: z.string(),
	companions_sa: z.array(z.string()),
	companions_so: z.array(z.string()),
	timetable: z.array(timetableDataSchema),
})

export type PersonalData = z.infer<typeof personalDataSchema>;

export const serverDataSchema = z.object({
	anmeldungen: z.record(personalDataSchema)
})

export type ServerData = z.infer<typeof serverDataSchema>;