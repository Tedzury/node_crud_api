import { ServerResponse } from "http";
import database from "../database/dataBase";
import wrappedResponse from "../utils/wrappedResponse";
import { randomUUID } from "crypto";
import { HTTP_STATUS_CODES } from "../shared/constants";
import { DBUser } from "../shared/types";

const requestHandlerPost = async (_response: ServerResponse, parsedUrl: string[], parsedBody: any) => {
	// const dbInstance = database();
	const newUser = {...parsedBody, id: randomUUID()} as DBUser;
	const dbRequest = async () => {
		const response = await fetch('http://localhost:5000', {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *client
			body: JSON.stringify({action: 'saveUser', payload: newUser}), // body data type must match "Content-Type" header
		});
		return await response.json();
	}
	const data = await dbRequest();
	return wrappedResponse(_response, HTTP_STATUS_CODES.OK, data)
}

export default requestHandlerPost;
