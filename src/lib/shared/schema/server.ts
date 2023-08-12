import { z } from 'zod';

export const uuidSchema = z.string().uuid();
export const nameSchema = z.string().trim().min(1);
export const emailSchema = z.string().trim().email();

const gamingSchema = z.object({
	type: z.enum(["GAMING"]),
	name: z.string(),
	system: z.string(),
	master: z.string(),
	player: z.array(z.string()),
})

const masteringSchema = z.object({
	type: z.enum(["MASTERING"]),
	name: z.string(),
	system: z.string(),
	master: z.string(),
	player: z.array(z.string()),
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

const hourSchema = z.nullable(gamingSchema.or(masteringSchema).or(nothingSchema).or(welcomeSchema).or(helpingSchema).or(lunchSchema).or(dinnerSchema))

const daySchemaSunday = z.object({
	10: hourSchema,
	12: hourSchema,
	13: hourSchema,
	15: hourSchema,
	17: hourSchema,
});

const daySchemaSaturday = daySchemaSunday.merge(z.object({
	18: hourSchema,
	20: hourSchema,
	22: hourSchema,
}));

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

