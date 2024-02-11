import { ServerResponse } from "http";
import wrappedResponse from "../utils/wrappedResponse";
import { DB_METHODS, HTTP_STATUS_CODES, RESP_MSG } from "../shared/constants";
import { DBUser } from "../shared/types";
import dataBaseRequest from "../database/dataBaseRequest";
import validateJSON from "../helpers/validateJson";
import validateUser from "../helpers/validateUser";
import { v4 as uuid } from 'uuid';

const requestHandlerPost = async (_response: ServerResponse, _parsedUrl: string[], _requestBody: any) => {

	if (_parsedUrl.length > 2) return wrappedResponse(_response, HTTP_STATUS_CODES.NOT_FOUND, { message: RESP_MSG.INVALID_ROUTE})

	const parsedBody = validateJSON(_requestBody);
	if (!parsedBody) return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.INVALID_JSON });
	const validatedUser = validateUser(parsedBody);
	if (!validatedUser) return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.INVALID_USER_FORMAT });

	const newUser = {...parsedBody, id: uuid()} as DBUser;
	const data = await dataBaseRequest({ action: DB_METHODS.SAVE_USER, payload: newUser });
	return wrappedResponse(_response, HTTP_STATUS_CODES.CREATED, data)
}

export default requestHandlerPost;
