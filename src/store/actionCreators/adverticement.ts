import { AppDispatch } from "../";
import adverticementSlice from "../reducers/adverticement";
import { firebaseDB as db } from "../../services/firebaseDB";
import { errorHandler } from "../../utils/errorHandler";
import { isObject } from "../../utils/isObject";
// type
import { IAdverticement } from "../../interface/adverticement";
import { IFirebaseAdverticement } from "../../interface/firebase/advertisement";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export const fetchAllAdverticement = (limit: number) => async (
	dispatch: AppDispatch
) => {
	try {
		dispatch(adverticementSlice.actions.FetchAdverticement());

		const { docs, lastDoc } = await db.getSortedDosc<
			IFirebaseAdverticement,
			"title"
		>("advertisement", "title", limit);

		const advertisements: IAdverticement[] = [];
		for (let doc of docs) {
			if (
				isObject<IAdverticement>(doc, [
					"id",
					"title",
					"description",
					"price",
					"uid"
				])
			)
				advertisements.push(doc);
		}
		if (advertisements.length !== 0) {
			dispatch(
				adverticementSlice.actions.FetchAdverticementSucsses(
					advertisements
				)
			);
		}

		if (advertisements.length === limit) {
			dispatch(adverticementSlice.actions.SetLastDoc(lastDoc));
		} else {
			dispatch(adverticementSlice.actions.SetDataEmpty(true));
		}

		return !(advertisements.length < limit) ? lastDoc : null;
	} catch (error) {
		const message = errorHandler(error);
		dispatch(adverticementSlice.actions.FetchAdverticementError(message));
		throw new Error(message);
	}
};

export const fetchNextAllAdverticement = (
	limit: number,
	prevDoc: QueryDocumentSnapshot<DocumentData>
) => async (dispatch: AppDispatch) => {
	try {
		dispatch(adverticementSlice.actions.FetchAdverticement());

		const { docs, lastDoc } = await db.getNextSortedDosc<
			IFirebaseAdverticement,
			"title"
		>("advertisement", "title", limit, prevDoc);

		const advertisements: IAdverticement[] = [];
		for (let doc of docs) {
			if (
				isObject<IAdverticement>(doc, [
					"id",
					"title",
					"description",
					"price",
					"uid"
				])
			)
				advertisements.push(doc);
		}

		if (advertisements.length !== 0) {
			dispatch(
				adverticementSlice.actions.FetchAdverticementSucsses(
					advertisements
				)
			);
		}

		if (advertisements.length === limit) {
			dispatch(adverticementSlice.actions.SetLastDoc(lastDoc));
		} else {
			dispatch(adverticementSlice.actions.SetDataEmpty(true));
		}

		return !(advertisements.length < limit) ? lastDoc : null;
	} catch (error) {
		const message = errorHandler(error);
		dispatch(adverticementSlice.actions.FetchAdverticementError(message));
		throw new Error(message);
	}
};
