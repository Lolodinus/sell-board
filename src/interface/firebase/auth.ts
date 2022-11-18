export interface IFirebaseLogin {
	email: string;
	password: string;
}

export interface IFirebaseRegistration extends IFirebaseLogin {
	login: string;
}

export type Role = "USER" | "ADMIN";
