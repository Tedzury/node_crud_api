import { ServerResponse } from "http";
import validateJSON from "../helpers/validateJson";
import validateUser from "../helpers/validateUser";
import { DB_METHODS, HTTP_STATUS_CODES, RESP_MSG } from "../shared/constants";
import wrappedResponse from "../utils/wrappedResponse";
import {validate as isUuidValid} from 'uuid';
import dataBaseRequest from "../database/dataBaseRequest";

const requestHandlerPut = async (_response: ServerResponse, _parsedUrl: string[], _requestBody: string) => {
	if (_parsedUrl.length < 3) return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.NO_ID_PROVIDED });
	if (_parsedUrl.length > 3) return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.INVALID_ROUTE });
	const userId = _parsedUrl[2];
	const isIdValid = isUuidValid(userId);
	if (isIdValid) {
		const parsedBody = validateJSON(_requestBody);
		if (!parsedBody) return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.INVALID_JSON });
		const validatedUser = validateUser(parsedBody);
		if (!validatedUser) return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.INVALID_USER_FORMAT });

		const data = await dataBaseRequest({ action: DB_METHODS.UPDATE_USER, payload: { ...validatedUser, id: userId } });
			if (Object.hasOwn(data, 'message')) {
				return wrappedResponse(_response, HTTP_STATUS_CODES.NOT_FOUND, data)
			}
			return wrappedResponse(_response, HTTP_STATUS_CODES.OK, data);

	} else {
		return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.INVALID_ID });
	}
};

export default requestHandlerPut;
