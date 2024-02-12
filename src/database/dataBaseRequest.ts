import dotenv from 'dotenv';
import { DBUser, ResponseData } from '../shared/types/index';

dotenv.config();

const dbPort = process.env.DATABASE_PORT || 5000;

type RequestBody = {
	action: string;
	payload?: string | DBUser;
}

const dataBaseRequest = async (request_body: RequestBody): Promise<ResponseData> => {
	const response = await fetch(`http://localhost:${dbPort}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},

		body: JSON.stringify(request_body),
	});
	return await response.json();
}

export default dataBaseRequest;
