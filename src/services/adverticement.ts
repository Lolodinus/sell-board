import { firebaseIS as storage } from "./firebaseStore";
import { firebaseDB as db } from "./firebaseDB";
// types
import {
	IFirebaseAdverticement,
	IFirebaseAdverticementUpdate
} from "../interface/firebase/advertisement";
import {
	IAdverticementCreate,
	IAdverticementUpdate
} from "../interface/adverticement";

async function create(item: IAdverticementCreate) {
	const { title, description, price, uid, imageFile, time } = item;
	try {
		const advRef = await db.createDoc<IFirebaseAdverticement>(
			"advertisement",
			{
				title,
				description,
				price,
				uid,
				createDate: time,
				updateDate: time
			}
		);
		if (!imageFile) return;
		const dirRef = await storage.uploadWithId(
			"adverticement",
			imageFile,
			advRef.id
		);
		const imageURL = await storage.getUrl(dirRef);
		db.updateDocByRef<IFirebaseAdverticementUpdate>(advRef, {
			imageURL,
			updateDate: time
		});
	} catch (error) {
		throw error;
	}
}

async function update(item: IAdverticementUpdate) {
	try {
		const { id, uid, title, description, price, image, time } = item;
		// remove image
		const removeImageURL = image.beforeImageURL.filter(
			(url) => !image.afterImageURL.includes(url)
		);
		console.log(removeImageURL);
		storage.delete(removeImageURL);
		// upload new image
		const dirRef = await storage.uploadWithId(
			"adverticement",
			image.newImageFile,
			id
		);
		const imageURL = await storage.getUrl(dirRef);
		// update adverticement
		db.updateDoc<IFirebaseAdverticementUpdate>("advertisement", id, {
			title,
			description,
			price,
			imageURL,
			updateDate: time
		});
	} catch (error) {
		throw error;
	}
}

const Adverticement = {
	create,
	update
};

export default Adverticement;
