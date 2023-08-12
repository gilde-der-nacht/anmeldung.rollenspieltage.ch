import { z } from 'zod';

export const uuidSchema = z.string().uuid();
export const nameSchema = z.string().trim().min(1);
export const emailSchema = z.string().trim().email();

const roundSchema = z.object({
	id: z.string(),
	name: z.string(),
	system: z.string(),
	game_master: z.string(),
	players: z.array(z.string())
});
export type RoundSchema = z.infer<typeof roundSchema>;

const entrySchema = z.object({
	ok: z.boolean(),
	kueche: z.boolean(),
	kiosk: z.boolean(),
	gamemaster: z.nullable(roundSchema),
	player: z.nullable(roundSchema),
});
export type EntrySchema = z.infer<typeof entrySchema>;

const timestampSchema = z.object({
	ts: z.object({
		day: z.enum(["sa", 'so']),
		hour: z.number(),
		entry: entrySchema
	})
});
export type TimestampSchema = z.infer<typeof timestampSchema>;

const programSchema = z.object({
	name: z.string(),
	companions_sa: z.array(z.string()),
	companions_so: z.array(z.string()),
	timetable: timestampSchema,
})
export type ProgramSchema = z.infer<typeof programSchema>

// old

const gamingSchema = z.object({
	type: z.enum(["GAMING"]),
	id: z.string(),
	name: z.string(),
	system: z.string(),
	master: z.string(),
	player: z.array(z.string()),
})

const gamingFfSchema = z.object({
	type: z.enum(["GAMING_FF"]),
	id: z.string(),
})

const masteringSchema = z.object({
	type: z.enum(["MASTERING"]),
	id: z.string(),
	name: z.string(),
	system: z.string(),
	master: z.string(),
	player: z.array(z.string()),
})

const masteringFfSchema = z.object({
	type: z.enum(["MASTERING_FF"]),
	id: z.string(),
})

const nothingSchema = z.object({
	type: z.enum(["NOTHING"]),
})

const welcomeSchema = z.object({
	type: z.enum(["WELCOME"]),
})

const helpingSchema = z.object({
	type: z.enum(["HELPING"]),
})

const lunchSchema = z.object({
	type: z.enum(["LUNCH"]),
})

const dinnerSchema = z.object({
	type: z.enum(["DINNER"]),
})

export const hourSchema = z.nullable(gamingSchema.or(gamingFfSchema).or(masteringSchema).or(masteringFfSchema).or(nothingSchema).or(welcomeSchema).or(helpingSchema).or(lunchSchema).or(dinnerSchema))
export type HourSchema = z.infer<typeof hourSchema>;

export const daySchemaSunday = z.object({
	10: hourSchema,
	12: hourSchema,
	13: hourSchema,
	15: hourSchema,
	17: hourSchema,
});

export const daySchemaSaturday = daySchemaSunday.merge(z.object({
	18: hourSchema,
	20: hourSchema,
	22: hourSchema,
}));

export const daySchemaGeneral = z.map(z.number(), hourSchema);

export const serverDataSchema = z.object({
	id: z.string().uuid(),
	date_created: z.string(),
	program: z.object({
		people: z.object({
			main: z.string(),
			group: z.array(z.string())
		}),
		samstag: z.nullable(daySchemaSaturday),
		sonntag: z.nullable(daySchemaSunday),
	})
});
export type ServerData = z.infer<typeof serverDataSchema>;

