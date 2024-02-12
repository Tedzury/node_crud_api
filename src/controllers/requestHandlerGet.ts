import { ServerResponse, request } from 'http';
import wrappedResponse from '../utils/wrappedResponse';
import { HTTP_STATUS_CODES, RESP_MSG, DB_METHODS} from '../shared/constants';
import dataBaseRequest from '../database/dataBaseRequest';
import {validate as isUuidValid} from 'uuid';

const requestHandlerGet = async (_response: ServerResponse, _parsedUrl: string[]) => {
	if (_parsedUrl.length === 2) {
		const data = await dataBaseRequest({ action: DB_METHODS.GET_ALL_USERS });
		return wrappedResponse(_response, HTTP_STATUS_CODES.OK, data)
	}
	if (_parsedUrl.length > 2) {
		const userId = _parsedUrl[2];
		const isIdValid = isUuidValid(userId);
		if (isIdValid) {
			const data = await dataBaseRequest({ action: DB_METHODS.GET_USER, payload: userId });
			if (Object.hasOwn(data, 'message')) {
				return wrappedResponse(_response, HTTP_STATUS_CODES.NOT_FOUND, data)
			}
			return wrappedResponse(_response, HTTP_STATUS_CODES.OK, data);
		} else {
			return wrappedResponse(_response, HTTP_STATUS_CODES.BAD_REQUEST, { message: RESP_MSG.INVALID_ID })
		}
	}
};

export default requestHandlerGet;
