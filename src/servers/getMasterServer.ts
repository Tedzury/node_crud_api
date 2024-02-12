import { createServer, request } from "http";
import LoadBalancer from "../utils/loadBalancer";
import { HTTP_STATUS_CODES, INF_MSG, RESP_MSG } from "../shared/constants";
import wrappedResponse from "../utils/wrappedResponse";

const getMasterServer = (loadBalancer: LoadBalancer) => {
	return createServer( async (req, res) => {
		try {
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
					res.statusCode = proxyRes.statusCode;
					proxyRes.pipe(res)
				})
				proxyRequest.write(requestData);
				proxyRequest.end();
				console.log(INF_MSG.REQUEST_REDIRECT.replace('%port%', loadBalancer.getCurrServer().toString()))
				loadBalancer.setNextServer();
			})
		} catch(err) {
			console.log(err)
			return wrappedResponse(res, HTTP_STATUS_CODES.SERVER_ERROR, { message: RESP_MSG.SERVER_ERROR})
		}

	});
};

export default getMasterServer;
