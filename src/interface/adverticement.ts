import { IFirebaseAdverticement } from "./firebase/advertisement";

export interface IAdverticement extends IFirebaseAdverticement {
	readonly id: string;
}

export interface IAdverticementCreate
	extends Omit<
		IFirebaseAdverticement,
		"imageURL" | "createDate" | "updateDate"
	> {
	imageFile: File[];
	time: number;
}

export interface IAdverticementUpdate
	extends Omit<IAdverticementCreate, "imageFile"> {
	readonly id: string;
	image: {
		beforeImageURL: string[];
		afterImageURL: string[];
		newImageFile: File[];
	};
}
