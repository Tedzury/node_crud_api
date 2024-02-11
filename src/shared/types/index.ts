export type DBUser = {
	id: string;
	username: string;
	age: number;
	hobbies: string[];
}

export type reqUser = Omit<DBUser, 'id'>;

type DbRespTypeUser = { data: DBUser };
type DbRespTypeUsers = { data: DBUser[] };
type DbRespTypeError = { message: string };


export type ResponseData = DbRespTypeError | DbRespTypeUser | DbRespTypeUsers ;
