import { createServer } from 'http';
import requestHandler from './controllers/requestHandler';

const getServer = (port: number | string) => {

	const server = createServer((req, res) => {
		requestHandler(req, res, port)
	});

	server.listen(port);
	return server
};

export default getServer;
