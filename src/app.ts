import isMulti from './helpers/isMulti';
import getServer from './servers/getServer';
import getMasterServer from './servers/getMasterServer';
import cluster from 'cluster';
import LoadBalancer from './utils/loadBalancer';
import dotenv from 'dotenv';
import { INF_MSG } from './shared/constants'
import { availableParallelism } from 'os';
import getDataBaseServer from './database/getDatabaseServer';

dotenv.config();

const port = process.env.PORT || 4000;
const dbPort = process.env.DATABASE_PORT || 5000;
const isMultiple = isMulti(process.argv);

const app = () => {

	if (cluster.isPrimary) {
		console.log(INF_MSG.PRIM_PROC.replace('%pid%', process.pid.toString()));
		const dataBaseServer = getDataBaseServer();
		dataBaseServer.listen(dbPort);

    if (isMultiple) {

			console.log(INF_MSG.MASTER_SERVER.replace('%pid%', process.pid.toString()).replace('%port%', port.toString()));

			const maxWorkers = availableParallelism() - 1;
			const loadBalancer = new LoadBalancer(Number(port), maxWorkers);
			const masterServer = getMasterServer(loadBalancer);

			masterServer.listen(port);

      console.log(INF_MSG.CPU_AVAILABLE.replace('%numCPUs%', maxWorkers.toString()));

      for (let i = 1; i < maxWorkers; i++) {
        cluster.fork({ PORT: (Number(port) + i).toString() });
      }

    } else {
      cluster.fork({ port: port });
    }
  } else {
    const workerPort = process.env.PORT || port;
		getServer(workerPort)
		console.log(
			INF_MSG.WORKER_START.replace('%pid%', process.pid.toString()).replace('%port%', workerPort.toString()),
		);
  }
};

export default app;
