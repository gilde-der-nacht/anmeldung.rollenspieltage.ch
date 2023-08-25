export const load = async ({url}) => {
  const isPrint = url.searchParams.get("print");
  console.log({url});
  
	return {isPrint: isPrint === "true"};
};
