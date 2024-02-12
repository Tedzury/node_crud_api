const isMulti = (args: string[]) => {
	const isMulti = args.filter((arg) => arg === '--isMulti=true');
	return isMulti.length > 0;
};

export default isMulti;
