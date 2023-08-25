export const load = async ({url}) => {
  const isPrint = url.searchParams.get("print");
	return {isPrint: isPrint === "true"};
};
