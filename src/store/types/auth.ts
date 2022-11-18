import { Role } from "../../interface/firebase/auth";

export type AuthState = {
	uid?: string;
	login?: string;
	email?: string;
	role?: Role;
	isAuth: boolean;
	isLoading: boolean;
	error: null | string;
};
