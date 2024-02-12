import { DBUser } from "../shared/types";
import { RESP_MSG } from "../shared/constants";

class FancyDataBase {
	_usersStorage: DBUser[];
	constructor() {
		this._usersStorage = [];
	}
	saveUser (_newUser: DBUser)  {
		this._usersStorage = [...this._usersStorage, _newUser];
		return { data: _newUser };
	};
	updateUser (_updatedUser: DBUser)  {
		const { id } = _updatedUser;
		const user =  this._usersStorage.find((user: DBUser) => user.id === id);

		if (user) {
			this._usersStorage = this._usersStorage.map((user: DBUser) => {
				return user.id === _updatedUser.id ? _updatedUser : user;
			})
			return { data: _updatedUser};
		}
		return { message: RESP_MSG.USER_NOT_FOUND.replace('%id%', id)}
	};
	getUser (_id: string)  {
		const user =  this._usersStorage.find((user: DBUser) => user.id === _id);
		if (user) return { data: user};
		return { message: RESP_MSG.USER_NOT_FOUND.replace('%id%', _id)}
	};
	getAllUsers () { return { data: this._usersStorage} };
	deleteUser (_id: string) {
		const user =  this._usersStorage.find((user: DBUser) => user.id === _id);
		if (user) {
			this._usersStorage = this._usersStorage.filter((user: DBUser) => user.id !== _id)
			return { data: user};
		}
		return { message: RESP_MSG.USER_NOT_FOUND.replace('%id%', _id)}
	}
}

const database = () => new FancyDataBase();

export default database;
