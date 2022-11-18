export interface IFirebaseAdverticement {
	title: string;
	description: string;
	price: number;
	imageURL?: string[];
	uid: string;
	createDate: number;
	updateDate: number;
}

export interface IFirebaseAdverticementUpdate {
	title?: string;
	description?: string;
	price?: number;
	imageURL?: string[];
	updateDate: number;
}
