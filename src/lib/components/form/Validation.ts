export function isNonEmptyString(str: string | null | undefined): boolean {
	if (str === null || str === undefined) {
		return false;
	}
	return str.trim().length > 0;
}
