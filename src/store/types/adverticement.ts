import { IAdverticement } from "../../interface/adverticement";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export interface AdverticementState {
	adverticements: IAdverticement[];
	isLoading: boolean;
	error: null | string;
	lastDoc?: QueryDocumentSnapshot<DocumentData>;
	dataEmpty: boolean;
}
