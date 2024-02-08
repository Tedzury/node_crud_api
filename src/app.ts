import { IncomingMessage, createServer } from 'http';

const app = () => {
	console.log('newly builded!')
	const getRequestInfo = (request: IncomingMessage) => {
		let requestBody = '';

		console.log(request.url)
		console.log(request.method)
		request.on('data', (chunk) => {
			requestBody += chunk;
		});
		request.on('end', () => {
			console.log(requestBody ? JSON.parse(requestBody) : 'Body is empty');
		})
	}

	const myServer = createServer((req, res) => {
		getRequestInfo(req);
	})

	myServer.listen(4000)
};

export default app;
