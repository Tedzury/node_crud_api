import { IncomingMessage, ServerResponse } from 'http';
import wrappedResponse from '../utils/wrappedResponse';
import { HTTP_STATUS_CODES, RESP_MSG, HTTP_METHODS, INF_MSG } from '../shared/constants';
import requestHandlerGet from './requestHandlerGet';
import requestHandlerPost from './requestHandlerPost';

const requestHandler = (_request: IncomingMessage, _response: ServerResponse, port: number | string) => {
	try {
		console.log(INF_MSG.WORKER_HANDLES.replace('%port%', port.toString()))
		const { method, url: reqUrl } = _request;
		const parsedUrl = reqUrl.split('/').filter(arg => arg);

		const isNotAllowedMethod = !Array.from(Object.values(HTTP_METHODS)).some((httpMethod => httpMethod === method));
		const isInvalidPath = !(parsedUrl[0] === 'api' && parsedUrl[1] === 'users');

		if (isNotAllowedMethod) {
			return wrappedResponse(_response, HTTP_STATUS_CODES.WRONG_METHOD, { message: RESP_MSG.WRONG_METHOD });
		}
		if (isInvalidPath) {
			return wrappedResponse(_response, HTTP_STATUS_CODES.NOT_FOUND, { message: RESP_MSG.INVALID_ROUTE });
		}

		let requestBody = '';
		_request.on('data', (chunk) => {
			requestBody += chunk;
		});
		_request.on('end', () => {
			switch(method) {
				case HTTP_METHODS.PUT: {
					return wrappedResponse(_response, HTTP_STATUS_CODES.OK, { message: 'Polet normalniy!'});
				}
				case HTTP_METHODS.POST: {
					return requestHandlerPost(_response, parsedUrl, requestBody)
				}
				case HTTP_METHODS.DELETE: {
					return wrappedResponse(_response, HTTP_STATUS_CODES.OK, { message: 'Polet normalniy!'});
				}
				default: {
					return requestHandlerGet(_response, parsedUrl)
				}
			}
		})
	} catch(err) {
		console.log(err)
		return wrappedResponse(_response, HTTP_STATUS_CODES.SERVER_ERROR, { message: RESP_MSG.SERVER_ERROR})
	}
};

export default requestHandler;
