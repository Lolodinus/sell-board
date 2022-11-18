import { Role } from "./firebase/auth";

export interface ILogin {
	readonly id: string;
	login: string;
	email: string;
	role: Role;
}
