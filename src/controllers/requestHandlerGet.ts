import { ServerResponse } from 'http';
import wrappedResponse from '../utils/wrappedResponse';
import { HTTP_STATUS_CODES, RESP_MSG } from '../shared/constants';
import database from '../shared/dataBase';


const requestHandlerGet = (_response: ServerResponse, parsedUrl: string[]) => {
	// const dbInstance = database();
	if (parsedUrl.length === 2) {
		// return wrappedResponse(_response, HTTP_STATUS_CODES.OK, { data: database.getAllUsers()})
	}
};

export default requestHandlerGet;
