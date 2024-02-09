const HTTP_METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

const HTTP_STATUS_CODES = {
	OK: '200',
	CREATED: '201',
	BAD_REQUEST: '400',
	NOT_FOUND: '404',
	SERVER_ERROR: '500',
};

const POSSIBLE_ROUTES = {
	USERS: 'api/users',
	USER: 'api/users/'
}

const INF_MSG = {
	PRIM_PROC: 'Primary process %pid% is running',
	MASTER_SERVER: 'Master server %pid% started. Server running at http://localhost:%port%/',
	CPU_AVAILABLE: 'Current system has %numCPUs% CPU cores available.',
	WORKER_START: 'Worker %pid% started. Server running at http://localhost:%port%/'
}

export { HTTP_METHODS, HTTP_STATUS_CODES, POSSIBLE_ROUTES, INF_MSG }
