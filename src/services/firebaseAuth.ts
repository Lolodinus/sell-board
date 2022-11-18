import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	onAuthStateChanged,
	sendEmailVerification,
	applyActionCode
} from "firebase/auth";
import { auth } from "../config/firebase";
// type
import { Auth } from "firebase/auth";
import {
	IFirebaseLogin,
	IFirebaseRegistration,
	Role
} from "../interface/firebase/auth";
import { ILogin } from "../interface/auth";

class FirebaseAuth {
	auth: Auth;
	url: string;
	constructor(auth: Auth, url: string) {
		this.auth = auth;
		this.url = url;
	}
	registration = async (data: IFirebaseRegistration) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				this.auth,
				data.email,
				data.password
			);
			const user = userCredential.user;

			updateProfile(user, {
				displayName: data.login
			});

			this.setRole(user.uid, await user.getIdToken(), "USER");

			sendEmailVerification(user);
		} catch (error) {
			throw error;
		}
	};
	login = async (userData: IFirebaseLogin): Promise<ILogin> => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				this.auth,
				userData.email,
				userData.password
			);
			const user = userCredential.user;
			if (!user.emailVerified)
				throw new Error(
					"Email is not verified. please verify your email."
				);
			const role = await this.getRole(user.uid, await user.getIdToken());
			return {
				id: user.uid,
				login: user.displayName!,
				email: user.email!,
				role
			};
		} catch (error) {
			throw error;
		}
	};
	logout = async () => {
		try {
			await signOut(this.auth);
		} catch (error) {
			throw error;
		}
	};
	verifyEmail = async (code: string) => {
		try {
			await applyActionCode(this.auth, code);
		} catch (error) {
			throw error;
		}
	};
	checkAuth = async (
		auth: (user: ILogin) => any,
		notAuth: () => any,
		setError: (error: any) => any
	) => {
		const unsubscribe = onAuthStateChanged(this.auth, async (user) => {
			try {
				if (user) {
					if (!user.emailVerified)
						throw new Error(
							"Email is not verified. please verify your email."
						);
					const role = await this.getRole(
						user.uid,
						await user.getIdToken()
					);
					auth({
						id: user.uid,
						login: user.displayName!,
						email: user.email!,
						role
					});
				} else {
					notAuth();
				}
			} catch (error) {
				setError(error);
			}
		});
		unsubscribe();
	};
	setRole = async (uid: string, token: string, role: Role) => {
		try {
			const response = await fetch(`${this.url}/set_role`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					uid,
					token,
					role
				})
			});
			const data = await response.json();
			if (data.error) throw new Error(`${data.error}`);
		} catch (error) {
			throw error;
		}
	};
	getRole = async (uid: string, token: string) => {
		try {
			const response = await fetch(`${this.url}/get_role`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					uid,
					token
				})
			});
			const data = await response.json();
			return data.role;
		} catch (error) {
			throw error;
		}
	};
}

const firebaseAuth = new FirebaseAuth(
	auth,
	"https://sell-board.vercel.app/api"
);

export { firebaseAuth };
