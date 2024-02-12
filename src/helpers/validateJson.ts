const validateJSON = (requestBody: string) => {
	try {
		const parsedBody = JSON.parse(requestBody);
		if (parsedBody && typeof parsedBody === "object") {
				return parsedBody;
		}
	}
	catch (e) {
		return false;
	}

};

export default validateJSON;
