import { AppDispatch } from "../";
import userAdverticementSlice from "../reducers/userAdverticement";
import { firebaseDB as db } from "../../services/firebaseDB";
import { errorHandler } from "../../utils/errorHandler";
import { isObject } from "../../utils/isObject";
// type
import { IAdverticement } from "../../interface/adverticement";
import { IFirebaseAdverticement } from "../../interface/firebase/advertisement";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export const fetchUserAdverticement = (uid: string, limit: number) => async (
	dispatch: AppDispatch
) => {
	try {
		dispatch(userAdverticementSlice.actions.FetchUserAdverticement());

		const { docs, lastDoc } = await db.getSortefAndFiltreDocs<
			IFirebaseAdverticement,
			"uid",
			"title"
		>(
			"advertisement",
			"title",
			{
				field: "uid",
				opStr: "==",
				value: uid
			},
			limit
		);

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
				userAdverticementSlice.actions.FetchUserAdverticementSucsses(
					advertisements
				)
			);
		}

		if (advertisements.length === limit) {
			dispatch(userAdverticementSlice.actions.SetLastDoc(lastDoc));
		} else {
			dispatch(userAdverticementSlice.actions.SetDataEmpty(true));
		}

		return !(advertisements.length < limit) ? lastDoc : null;
	} catch (error) {
		const message = errorHandler(error);
		dispatch(
			userAdverticementSlice.actions.FetchUserAdverticementError(message)
		);
		throw new Error(message);
	}
};

export const fetchNextUserAdverticement = (
	uid: string,
	limit: number,
	prevDoc: QueryDocumentSnapshot<DocumentData>
) => async (dispatch: AppDispatch) => {
	try {
		dispatch(userAdverticementSlice.actions.FetchUserAdverticement());

		const { docs, lastDoc } = await db.getNewSortefAndFiltreDocs<
			IFirebaseAdverticement,
			"uid",
			"title"
		>(
			"advertisement",
			"title",
			{
				field: "uid",
				opStr: "==",
				value: uid
			},
			limit,
			prevDoc
		);

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
				userAdverticementSlice.actions.FetchUserAdverticementSucsses(
					advertisements
				)
			);
		}

		if (advertisements.length === limit) {
			dispatch(userAdverticementSlice.actions.SetLastDoc(lastDoc));
		} else {
			dispatch(userAdverticementSlice.actions.SetDataEmpty(true));
		}

		return !(advertisements.length < limit) ? lastDoc : null;
	} catch (error) {
		const message = errorHandler(error);
		dispatch(
			userAdverticementSlice.actions.FetchUserAdverticementError(message)
		);
		throw new Error(message);
	}
};
