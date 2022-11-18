import { storage } from "../config/firebase";
import {
	ref,
	uploadBytes,
	listAll,
	getDownloadURL,
	deleteObject
} from "firebase/storage";
import { getId } from "../utils/random";
// type
import { FirebaseStorage, StorageReference } from "firebase/storage";

type StorageCollection = "adverticement";

class FirebaseImageStorage {
	storage: FirebaseStorage;
	constructor(storage: FirebaseStorage) {
		this.storage = storage;
	}
	// upload
	uploadWithId = async (
		collection: StorageCollection,
		files: File[],
		id: string
	) => {
		try {
			const rootRef = ref(this.storage, `${collection}/${id}`);
			for (let file of files) {
				const name = `${getId()}.${file.name.split(".")[1]}`;
				const fileRef = ref(rootRef, name);
				await uploadBytes(fileRef, file);
			}
			return rootRef;
		} catch (error) {
			throw error;
		}
	};
	// get url
	getUrl = async (ref: StorageReference) => {
		try {
			const files = await listAll(ref);
			const urls: string[] = [];
			for (let file of files.items) {
				const url = await getDownloadURL(file);
				urls.push(url);
			}
			return urls;
		} catch (error) {
			throw error;
		}
	};
	// remove
	delete = async (imgUrl: string[]) => {
		try {
			for (let url of imgUrl) {
				const httpsRef = ref(this.storage, url);
				await deleteObject(httpsRef);
			}
		} catch (error) {
			throw error;
		}
	};
}

const firebaseIS = new FirebaseImageStorage(storage);

export { firebaseIS };
