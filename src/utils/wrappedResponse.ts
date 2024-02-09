import { ServerResponse } from "http";
import { ResponseData } from "src/shared/types";

const wrapperResponse = (_response: ServerResponse, _statusCode: number, _data: ResponseData): void => {
	_response.writeHead(_statusCode, {"Content-type": "application/json"});
	_response.end(JSON.stringify(_data));
}

export default wrapperResponse;
