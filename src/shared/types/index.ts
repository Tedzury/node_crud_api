export type DBUser = {
	id: string;
	username: string;
	age: number;
	hobbies: string[];
}

export type reqUser = Omit<DBUser, 'id'>;
