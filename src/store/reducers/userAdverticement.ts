import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAdverticementState } from "../types/userAdverticement";
// type
import { IAdverticement } from "../../interface/adverticement";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

const initialState: UserAdverticementState = {
	userAdverticements: [],
	isLoading: false,
	error: null,
	dataEmpty: false
};

const userAdverticementSlice = createSlice({
	name: "userAdverticement",
	initialState,
	reducers: {
		FetchUserAdverticement(state) {
			state.isLoading = true;
			state.error = null;
		},
		FetchUserAdverticementSucsses(
			state,
			action: PayloadAction<IAdverticement[]>
		) {
			state.userAdverticements.push(...action.payload);
			state.isLoading = false;
		},
		FetchUserAdverticementError(state, action: PayloadAction<string>) {
			state.error = action.payload;
			state.isLoading = false;
		},
		SetLastDoc(
			state,
			action: PayloadAction<QueryDocumentSnapshot<DocumentData>>
		) {
			state.lastDoc = action.payload;
		},
		SetDataEmpty(state, action: PayloadAction<boolean>) {
			state.dataEmpty = action.payload;
		},
		ResetUserAdverticement(state) {
			state.userAdverticements = [];
			state.dataEmpty = false;
		}
	}
});

export default userAdverticementSlice;
