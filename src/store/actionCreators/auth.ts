import { AppDispatch } from "../";
import AuthSlice from "../reducers/auth";
import { firebaseAuth as auth } from "../../services/firebaseAuth";
import { firebaseDB as db } from "../../services/firebaseDB";
// type
import { IFirebaseLogin } from "../../interface/firebase/auth";
import { ILogin } from "../../interface/auth";
import { IFirebaseUser } from "../../interface/firebase/user";

function errorHandler(
	error: any,
	defaultMessage: string = "Something went wrong"
) {
	if (error instanceof Error) {
		return error.message;
	} else {
		return defaultMessage;
	}
}

export const login = (data: IFirebaseLogin) => async (
	dispatch: AppDispatch
) => {
	try {
		dispatch(AuthSlice.actions.AuthLogin());
		const userData = await auth.login({
			email: data.email,
			password: data.password
		});
		dispatch(
			AuthSlice.actions.AuthSetUser({
				id: userData.id,
				login: userData.login,
				email: userData.email,
				role: userData.role
			})
		);
		db.createDocWithId<IFirebaseUser>("user", userData.id, {
			login: userData.login,
			email: userData.email
		});
	} catch (error) {
		const message = errorHandler(error);
		dispatch(AuthSlice.actions.AuthError(message));
		throw new Error(message);
	}
};

export const logout = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(AuthSlice.actions.AuthLogout());
		await auth.logout();
		dispatch(AuthSlice.actions.AuthResetUser());
	} catch (error) {
		return dispatch(AuthSlice.actions.AuthError(errorHandler(error)));
	}
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
	dispatch(AuthSlice.actions.AuthLogin());
	await auth.checkAuth(
		(user: ILogin) => {
			dispatch(
				AuthSlice.actions.AuthSetUser({
					id: user.id,
					login: user.login,
					email: user.email,
					role: user.role
				})
			);
		},
		() => {
			dispatch(AuthSlice.actions.AuthResetUser());
		},
		(error: any) => {
			const message = errorHandler(error);
			dispatch(AuthSlice.actions.AuthResetUser());
		}
	);
};
