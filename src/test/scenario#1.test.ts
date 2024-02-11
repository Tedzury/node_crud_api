import exp from "constants";
import getDataBaseServer from "../database/getDatabaseServer";
import getServer from "../getServer";

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

describe('testing my fansy crud api', () => {

	const DB = getDataBaseServer();
	const myServer = getServer(4000);
	DB.listen(5000);

	let userID = '';

	beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
		DB.close();
		myServer.close();
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
