import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth";
import userAdverticementSlice from "./userAdverticement";
import adverticementSlice from "./adverticement";

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	userAdverticement: userAdverticementSlice.reducer,
	adverticement: adverticementSlice.reducer
});

export default rootReducer;
