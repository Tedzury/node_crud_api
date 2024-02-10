import { ServerResponse } from "http";
import database from "../shared/dataBase";
import wrappedResponse from "../utils/wrappedResponse";
import { randomUUID } from "crypto";
import { HTTP_STATUS_CODES } from "../shared/constants";
import { DBUser } from "../shared/types";

const requestHandlerPost = (_response: ServerResponse, parsedUrl: string[], parsedBody: any) => {
	// const dbInstance = database();
	const newUser = {...parsedBody, id: randomUUID()} as DBUser;
	// database.saveUser(newUser)
	// console.log(database.getAllUsers());
	return wrappedResponse(_response, HTTP_STATUS_CODES.CREATED, { data: newUser })
}

export default requestHandlerPost;
