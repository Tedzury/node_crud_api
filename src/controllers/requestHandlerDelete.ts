import { ServerResponse } from "http";
import wrappedResponse from "../utils/wrappedResponse";
import dataBaseRequest from "../database/dataBaseRequest";
import { HTTP_STATUS_CODES, RESP_MSG, DB_METHODS } from "../shared/constants";
import {validate as isUuidValid} from 'uuid';

const requestHandlerDelete = async (_response: ServerResponse, _parsedUrl: string[]) => {
	if (_parsedUrl.length < 3) return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.NO_ID_PROVIDED });
	if (_parsedUrl.length > 3) return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.INVALID_ROUTE });
	const userId = _parsedUrl[2];
	const isIdValid = isUuidValid(userId);
	if (isIdValid) {
		const data = await dataBaseRequest({ action: DB_METHODS.DELETE_USER, payload: userId });
			if (Object.hasOwn(data, 'message')) {
				return wrappedResponse(_response, HTTP_STATUS_CODES.NOT_FOUND, data)
			}
			return wrappedResponse(_response, HTTP_STATUS_CODES.OK, data);

	} else {
		return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.INVALID_ID });
	}
}

export default requestHandlerDelete;
