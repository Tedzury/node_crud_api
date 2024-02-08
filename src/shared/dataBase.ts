import { DBUser } from "./types";

type DBInstanceType = {
	usersStorage: DBUser[];
	saveUser: (_newUser: DBUser) => void;
	updateUser: (_updatedUser: DBUser) => void;
	getUser: (_id: string) => any;
	getAllUsers: () => any;
	deleteUser: (_id: string) => any;
};

const database = (() => {
	let instance: DBInstanceType;

  function createInstance() {
    return {
      usersStorage: [] as DBUser[],
      saveUser: (_newUser: DBUser) => {
				this.usersStorage = [...this.usersStorage, _newUser];
			},
			updateUser: (_updatedUser: DBUser) => {
				this.usersStorage = this.usersStorage.map((user: DBUser) => {
					return user.id === _updatedUser.id ? _updatedUser : user;
				})
			},
			getUser: (_id: string) => {
				return this.usersStorage.find((user: DBUser) => user.id === _id);
			},
			getAllUsers: () => this.usersStorage,
			deleteUser: (_id: string) => this.usersStorage = this.usersStorage.filter((user: DBUser) => user.id !== _id)
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})()

export default database;
