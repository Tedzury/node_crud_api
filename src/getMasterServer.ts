import { createServer, request } from "http";
import LoadBalancer from "./utils/loadBalancer";

const getMasterServer = (loadBalancer: LoadBalancer) => {
	return createServer((req) => {

		const requestData = JSON.stringify({msg: `I was sent to ${loadBalancer.getCurrServer()} port!`});

		const options = {
			hostname: '127.0.0.1',
			port: loadBalancer.getCurrServer(),
			path: req.url,
			method: req.method,
			headers: {
				'Content-type': 'application/json',
				'Content-length': Buffer.byteLength(requestData)
			}
		};

		const reRequest = request(options, async (res) => {
			res.setEncoding('utf-8');
		})

		reRequest.write(requestData);

		reRequest.end();
		console.log(`Redirecting request to the server at ${loadBalancer.getCurrServer()} port `)
		loadBalancer.setNextServer();
	});
};

export default getMasterServer;
