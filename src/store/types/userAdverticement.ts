import { IAdverticement } from "../../interface/adverticement";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export interface UserAdverticementState {
	userAdverticements: IAdverticement[];
	isLoading: boolean;
	error: null | string;
	lastDoc?: QueryDocumentSnapshot<DocumentData>;
	dataEmpty: boolean;
}
