const HTTP_METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

const HTTP_STATUS_CODES = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	WRONG_METHOD: 405,
	SERVER_ERROR: 500,
};

const INF_MSG = {
	PRIM_PROC: 'Primary process %pid% is running',
	MASTER_SERVER: 'Master server %pid% started. Server running at http://localhost:%port%/',
	CPU_AVAILABLE: 'Current system has %numCPUs% CPU cores available.',
	WORKER_START: 'Worker %pid% started. Server running at http://localhost:%port%/',
	REQUEST_REDIRECT: 'Redirecting request to the server at %port% port',
	WORKER_HANDLES: 'Server at http://localhost:%port%/ handles request!',
}

const RESP_MSG = {
	SERVER_ERROR: 'Internal server error happened. We are trying to figure out what have caused it.',
	WRONG_METHOD: 'Such methods are not allowed while working with server. Only GET, POST, PUT and DELETE methods are allowed.',
	INVALID_ROUTE: 'You are trying to reach route that doesn\'t exist. Try to use /api/users route with GET and POST methods or /api/users/{userID} route with GET, PUT AND DELETE methods.',
	INVALID_ID: 'You are trying to reach user with invalid ID.',
	USER_NOT_FOUND: 'User with provided ID: %id% doesn\'t exist in database. Check provided ID;',
	INVALID_JSON: 'You are trying to pass and invalid JSON in your request. Don\'t do that!',
	INVALID_USER_FORMAT: 'The user you are trying to pass are not valid. User object must look like: { username: "Timmy", age: 15, hobbies: ["volleyball"]. }'
}

const DB_METHODS = {
	SAVE_USER: 'saveUser',
	UPDATE_USER: 'updateUser',
	GET_USER: 'getUser',
	GET_ALL_USERS: 'getAllUsers',
	DELETE_USER: 'deleteUser',
}

export { HTTP_METHODS, HTTP_STATUS_CODES, INF_MSG, RESP_MSG, DB_METHODS }
