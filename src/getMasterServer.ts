import { createServer, request } from "http";
import LoadBalancer from "./utils/loadBalancer";
import { INF_MSG } from "./shared/constants";

const getMasterServer = (loadBalancer: LoadBalancer) => {
	return createServer( async (req, res) => {

		let requestData = '';

		req.on('data', (chunk) => {
			requestData += chunk;
		})

		req.on('end', () => {
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

			const proxyRequest = request(options, async (proxyRes) => {
				proxyRes.setEncoding('utf-8');
				proxyRes.pipe(res)
			})
			proxyRequest.write(requestData);
			proxyRequest.end();
			console.log(INF_MSG.REQUEST_REDIRECT.replace('%port%', loadBalancer.getCurrServer().toString()))
			loadBalancer.setNextServer();
		})
	});
};

export default getMasterServer;
