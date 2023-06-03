export const removeCreated = () => {
	const url = new URL(location.href);
	url.searchParams.delete('created');
	history.replaceState(false, '', url);
};
