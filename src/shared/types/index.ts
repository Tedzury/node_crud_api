export type DBUser = {
	id: string;
	username: string;
	age: number;
	hobbies: string[];
}

export type ReqUser = Omit<DBUser, 'id'>;

export type EstimatedUser = Partial<ReqUser>;

type DbRespTypeUser = { data: DBUser };
type DbRespTypeUsers = { data: DBUser[] };
type DbRespTypeError = { message: string };

export type ResponseData = DbRespTypeError | DbRespTypeUser | DbRespTypeUsers ;
