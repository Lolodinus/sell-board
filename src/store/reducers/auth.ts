import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth";
// type
import { ILogin } from "../../interface/auth";

const initialState: AuthState = {
	isAuth: false,
	isLoading: false,
	error: null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		AuthLogin(state) {
			state.isLoading = true;
			state.error = null;
		},
		AuthLogout(state) {
			state.isLoading = true;
			state.error = null;
		},
		AuthSetUser(state, action: PayloadAction<ILogin>) {
			state.uid = action.payload.id;
			state.login = action.payload.login;
			state.role = action.payload.role;
			state.email = action.payload.email;
			state.isLoading = false;
			state.isAuth = true;
		},
		AuthResetUser(state) {
			state.uid = undefined;
			state.login = undefined;
			state.email = undefined;
			state.role = undefined;
			state.isAuth = false;
			state.isLoading = false;
		},
		AuthError(state, action: PayloadAction<string>) {
			state.error = action.payload;
			state.isLoading = false;
		}
	}
});

export default authSlice;
