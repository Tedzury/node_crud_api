import { ReqUser } from "../shared/types";

const validateUser = (parsedBody: ReqUser) => {
	if (Object.keys(parsedBody).length !== 3) return false;
	const allRequiredFields = (Object.hasOwn(parsedBody, 'username') && Object.hasOwn(parsedBody, 'age') && Object.hasOwn(parsedBody, 'hobbies'));
	if (!allRequiredFields) return false;
	if (typeof parsedBody.username !== 'string') return false;
	if (typeof parsedBody.age !== 'number') return false;
	if (!Array.isArray(parsedBody.hobbies)) return false;
	if (!parsedBody.hobbies.every(item => typeof item === 'string')) return false;
	return parsedBody;
};

export default validateUser;
