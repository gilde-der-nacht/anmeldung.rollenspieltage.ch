const registered = {
	ids: [
		'OK_Michelle',
		'db2f9c5c-3cbd-418f-9d4c-876eb87986ab',
		'5d7f05ad-c27b-4c55-953f-64b993cca203',
    "5bf8ea05-e450-4024-9cc7-cea512159139",
    "97ccdf4a-6df6-49a0-aa8b-b9ff13f730bd",
    "aec28e93-d7ae-485c-b689-a0c01a8f9b00",
    "02ea549c-975c-4d15-a38e-ddad46ba8a4d"
	],
	players: [
    'Alain Bachmann', 
    'Jonas', 
    'Michelle Meyer', 
    'Nikola Micic',
    "Lena Brunner",
    "Ronnie Krämer",
    "Marine Fehlmann",
    "Elena",
    "Tasha",
    "Herbert"
  ],
};

export function participatesInBC(id: string): boolean {
	return registered.ids.includes(id);
}

export function getBCPlayerNames(): string[] {
	return registered.players;
}

export function getBCIds(): string[] {
  return registered.ids;
}