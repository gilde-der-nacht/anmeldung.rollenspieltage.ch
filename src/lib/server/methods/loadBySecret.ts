import { env } from "$env/dynamic/private";
import { OLYMP } from '$lib/Constants';
import { uuidSchema, type ServerData, serverDataSchema } from '$lib/shared/schema/server';
import { z } from 'zod';

type SuccessfullLoad = {
	success: true;
	id: string;
	secret: string;
	program: ServerData["program"];
};

type FailedLoad = {
	success: false;
	status: string;
};

const responseSchema = z.object({
	participant: z.object({
		id: uuidSchema,
		secret: uuidSchema,
	}),
	program: serverDataSchema,
});

export async function loadBySecret(secret: string): Promise<SuccessfullLoad | FailedLoad> {
	// const base = OLYMP + '/flows/trigger/bca00e9a-0e24-4eba-a4fc-90321af45289';
	// const url = new URL(base);
	// url.searchParams.set('secret', secret);
	// if (env.OLYMP_TOKEN === undefined) {
	// return { success: false, status: "0140" };
	// }
	// url.searchParams.set('access_token', env.OLYMP_TOKEN);

	// const res = await fetch(url);
	// if (!res.ok) {
	// return { success: false, status: "0144-" + res.status };
	// }
	// const json = await res.json();
	// const parsed = responseSchema.safeParse(json);

	// if (!parsed.success) {
	// console.log(parsed.error);

	// return { success: false, status: "0142-" + res.status };
	// }

	const parsed: { data: z.infer<typeof responseSchema> } = {
		data: {
			participant: {
				id: "my-id",
				secret: "my-secret"
			},
			program: {
				date_created: "date",
				id: "id",
				program: {
					people: {
						main: "Main Protagonist",
						group: ["Sidekick"]
					},
					samstag: {
						"10": {
							type: "GAMING",
							id: "G01",
							name: "Game Name",
							master: "Master's Name",
							player: ["Main Protagonist", "Sidekick", "Somebody else"],
							system: "Best System in the world"
						},
						"12": {
							type: "LUNCH"
						},
						"13": {
							type: "HELPING"
						},
						"15": {
							type: "NOTHING"
						},
						"17": {
							type: "DINNER"
						},
						"18": {
							type: "WELCOME"
						},
						"20": {
							type: "MASTERING",
							id: "M01",
							master: "Main Protagonist",
							name: "My nice game",
							system: "Secret System",
							player: []
						},
						"22": {
							type: "MASTERING_FF",
							id: "M01",
						}
					},
					sonntag: {
						"10": {
							type: "GAMING",
							id: "G02",
							master: "Very long master",
							player: ["this one", "this one", "this one", "this one", "this one", "this one",],
							name: "Very long name of the game round, Very long name of the game round",
							system: "short"
						},
						"12": {
							type: "LUNCH"
						},
						"13": {
							type: "GAMING_FF",
							id: "G02"
						},
						"15": {
							type: "GAMING",
							id: "G03",
							master: "Very long master",
							player: ["this one",],
							name: "Shorty",
							system: "Very long name of the system"
						},
						"17": {
							type: "HELPING"
						}
					}
				}
			}

		}
	}


	return {
		success: true,
		id: parsed.data.participant.id,
		secret: parsed.data.participant.secret,
		program: parsed.data.program.program,
	};
}
