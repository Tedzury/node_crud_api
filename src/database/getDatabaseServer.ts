import { createServer, request } from "http";
import { HTTP_STATUS_CODES, RESP_MSG } from "../shared/constants";
import wrappedResponse from "../utils/wrappedResponse";
import initDB from "./dataBase";

const database = initDB();

type ParsedData = {
	action: string;
	payload: string | undefined;
}

const getDataBaseServer = () => {
	return createServer( async (req, res) => {
		try {
			let requestData = '';

			req.on('data', (chunk) => {
				requestData += chunk;
			})

			req.on('end', () => {
				const parsedData: ParsedData = JSON.parse(requestData);
				const { action, payload } = parsedData;
				const returnData = database[action](payload);
				return wrappedResponse(res, HTTP_STATUS_CODES.OK, returnData);
			})
		} catch(err) {
			console.log(err);
			return wrappedResponse(res, HTTP_STATUS_CODES.SERVER_ERROR, { message: RESP_MSG.SERVER_ERROR});
		}

	});
};

export default getDataBaseServer;
