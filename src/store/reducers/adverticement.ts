import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// type
import { AdverticementState } from "../types/adverticement";
import { IAdverticement } from "../../interface/adverticement";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

const initialState: AdverticementState = {
	adverticements: [],
	isLoading: false,
	error: null,
	dataEmpty: false
};

const adverticementSlice = createSlice({
	name: "adverticement",
	initialState,
	reducers: {
		FetchAdverticement(state) {
			state.isLoading = true;
			state.error = null;
		},
		FetchAdverticementSucsses(
			state,
			action: PayloadAction<IAdverticement[]>
		) {
			state.adverticements.push(...action.payload);
			state.isLoading = false;
		},
		FetchAdverticementError(state, action: PayloadAction<string>) {
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
			state.adverticements = [];
			state.dataEmpty = false;
		}
	}
});

export default adverticementSlice;
