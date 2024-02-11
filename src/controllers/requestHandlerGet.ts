import { ServerResponse, request } from 'http';
import wrappedResponse from '../utils/wrappedResponse';
import { HTTP_STATUS_CODES, RESP_MSG, DB_METHODS} from '../shared/constants';
import dataBaseRequest from '../database/dataBaseRequest';
import {validate as isUuidValid, v4 } from 'uuid';
import { ResponseData } from 'src/shared/types';


const requestHandlerGet = async (_response: ServerResponse, parsedUrl: string[]) => {
	if (parsedUrl.length === 2) {
		const data = await dataBaseRequest({ action: DB_METHODS.GET_ALL_USERS });
		return wrappedResponse(_response, HTTP_STATUS_CODES.OK, data)
	}
	if (parsedUrl.length > 2) {
		const userId = parsedUrl[2];
		const isIdValid = isUuidValid(userId);
		if (isIdValid) {
			const data:ResponseData = await dataBaseRequest({ action: DB_METHODS.GET_USER, payload: userId });
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
