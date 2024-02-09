import { IncomingMessage, ServerResponse } from 'http';

const requestHandler = (_request: IncomingMessage, _response: ServerResponse, port: number | string) => {
	let requestBody = '';

	console.log(`Current url is ${_request.url}`)
	console.log(`Current method is ${_request.method}`)
	console.log(`Current port is ${port}`);
	_request.on('data', (chunk) => {
		requestBody += chunk;
	});
	_request.on('end', () => {
		console.log(requestBody ? JSON.parse(requestBody) : 'Body is empty');
	})
};

export default requestHandler;
