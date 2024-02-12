import getDataBaseServer from "../database/getDatabaseServer";
import getServer from "../getServer";
import { RESP_MSG } from "../shared/constants";

const DB = getDataBaseServer();
const myServer = getServer(4000);
DB.listen(5000);

console.log('IMPORTANT ! Close all active running versions of crud api before running tests, because it will cause a conflict!')

describe('Testing scenario #1. Testing happy paths in the app.', () => {

	let userID = '';

	const postRequestBody = {
		"username": "Oleg",
		"age": 29,
		"hobbies": ["tennis"]
	};
	const putRequestBody = {
		"username": "Maxim",
		"age": 15,
		"hobbies": ["dota2"]
	};
	const postRequestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postRequestBody),
	};
	const putRequestOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(putRequestBody),
	};

	beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('Should retrieve an empty array after calling for all users.', async () => {
		const { data } = await (await fetch('http://localhost:4000/api/users')).json()
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBe(0);
  });
	test('Should add new user after calling post', async () => {
		const { data } = await ( await fetch('http://localhost:4000/api/users', postRequestOptions)).json();
		const { id, username, age, hobbies } = data;
		userID = id;
		expect(username).toBe(postRequestBody.username);
		expect(age).toBe(postRequestBody.age);
		expect(hobbies[0]).toBe(postRequestBody.hobbies[0]);
	});
	test('Should retrieve newly created user after calling fetch with provided ID', async () => {
		const { data } = await (await fetch(`http://localhost:4000/api/users/${userID}`)).json()
		const { username, age, hobbies } = data;
		expect(username).toBe(postRequestBody.username);
		expect(age).toBe(postRequestBody.age);
		expect(hobbies[0]).toBe(postRequestBody.hobbies[0]);
	});
	test('Should successfully change data of user if new valid data is provided', async () => {
		const { data } = await (await fetch(`http://localhost:4000/api/users/${userID}`, putRequestOptions)).json();
		console.log(data);
		const { username, age, hobbies } = data;
		expect(username).toBe(putRequestBody.username);
		expect(age).toBe(putRequestBody.age);
		expect(hobbies[0]).toBe(putRequestBody.hobbies[0]);
	});
	test('Should delete user with provided userID', async () => {
		const { data } = await (await fetch(`http://localhost:4000/api/users/${userID}`, { method: 'DELETE'})).json();
		const { username, age, hobbies } = data;
		expect(username).toBe(putRequestBody.username);
		expect(age).toBe(putRequestBody.age);
		expect(hobbies[0]).toBe(putRequestBody.hobbies[0]);
	});
	test('User with provided ID should not exist in database', async () => {
		const { message } = await (await fetch(`http://localhost:4000/api/users/${userID}`)).json();
		const expectedMsg = `User with provided ID: ${userID} doesn't exist in database. Check provided ID;`;
		expect(message).toBe(expectedMsg);
	});
});

describe('Testing scenario #2.Testing basic validation of routes and methods in the app and showing appropriate messages.', () => {

	beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

	test('If user tries to reach routes that doesn\'t exist - he(she) receive appropriate message', async () => {
		const { message } = await (await fetch(`http://localhost:4000/api/iamwrongroute`)).json();
		expect(message).toBe(RESP_MSG.INVALID_ROUTE);
	});
	test('If user tries to use unallowed request method - he(she) receive appropriate message', async () => {
		const { message } = await (await fetch(`http://localhost:4000/api/users/`, { method: 'PATCH' })).json();
		expect(message).toBe(RESP_MSG.WRONG_METHOD);
	});
	test('If user tries to use PUT or DELETE method without providing ID in the route - he(she) receive appropriate message', async () => {
		const { message } = await (await fetch(`http://localhost:4000/api/users/`, { method: 'DELETE' })).json();
		expect(message).toBe(RESP_MSG.NO_ID_PROVIDED);
	});
	test('If user tries to provide ID in the route that doesn\'t correspond with uuid v4 signature - he(she) receive appropriate message', async () => {
		const { message } = await (await fetch(`http://localhost:4000/api/users/im_definitely_not_uuid_format`)).json();
		expect(message).toBe(RESP_MSG.INVALID_ID);
	});

	describe('Testing scenario #3. Testing validation of users input and and database responses.', () => {

		beforeAll(() => {
			jest.useFakeTimers();
		});

		afterAll(() => {
			jest.useRealTimers();
			DB.close();
			myServer.close();
		});

		let userID = '';

		const normalUser = {
			"username": "Oleg",
			"age": 29,
			"hobbies": ["tennis"]
		};

		const updatedUser = {
			"username": "Maxim",
			"age": 15,
			"hobbies": ["date2"]
		};

		const wrongJson = "{ trulala: trulalo not: valid }";

		const inappropriateUser = {
			Iam: "not",
			valid: "user",
		};

		const missedFormatUser = {
			"username": "Oleg",
			"age": "I\' older then you think, boy!",
			"hobbies": ["tennis"]
		};

		const requestOptions = (_method, _requestBody) => ({
				method: _method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(_requestBody),
			});

		test('If user tries to pass invalid JSON object or not an object in the body - he(she) receive appropriate message.', async () => {
			const { message } = await (await fetch(`http://localhost:4000/api/users/`, requestOptions("POST", wrongJson))).json();
			expect(message).toBe(RESP_MSG.INVALID_JSON);
		});
		test('If user tries to pass inappropriate format of user object - he(she) receive appropriate message.', async () => {
			const { message } = await (await fetch(`http://localhost:4000/api/users/`, requestOptions("POST", inappropriateUser))).json();
			expect(message).toBe(RESP_MSG.INVALID_USER_FORMAT);
		});
		test('Also, if user misses with required filed types - he(she) receive appropriate message.', async () => {
			const { message } = await (await fetch(`http://localhost:4000/api/users/`, requestOptions("POST", missedFormatUser))).json();
			expect(message).toBe(RESP_MSG.INVALID_USER_FORMAT);
		});
		test('If user does everything right - everything works fine :)', async () => {
			const { data } = await (await fetch(`http://localhost:4000/api/users/`, requestOptions("POST", normalUser))).json();
			const { username, age, hobbies, id } = data;
			userID = id;
			console.log(id)
			expect(username).toBe(normalUser.username);
			expect(age).toBe(normalUser.age);
			expect(hobbies[0]).toBe(normalUser.hobbies[0]);
		});
		test('Validation of users input on update also works', async () => {
			const { message } = await (await fetch(`http://localhost:4000/api/users/${userID}`, requestOptions("PUT", missedFormatUser))).json();
			expect(message).toBe(RESP_MSG.INVALID_USER_FORMAT);
		});
		test('If user tries to reach not existing user - he(she) receive appropriate message', async () => {
			const invalidID = '11111'.concat(userID.slice(5));
			console.log(userID);
			console.log(invalidID);
			const { message } = await (await fetch(`http://localhost:4000/api/users/${invalidID}`, requestOptions("PUT", updatedUser))).json();
			expect(message).toBe(RESP_MSG.USER_NOT_FOUND.replace('%id%', invalidID));
		});
		test('Should update user if specified corrent user ID and proper data of updated user.', async () => {
			const { data } = await (await fetch(`http://localhost:4000/api/users/${userID}`, requestOptions("PUT", updatedUser))).json();
			const { username, age, hobbies } = data;
			expect(username).toBe(updatedUser.username);
			expect(age).toBe(updatedUser.age);
			expect(hobbies[0]).toBe(updatedUser.hobbies[0]);
		});
	});
});
