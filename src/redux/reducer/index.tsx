import { combineReducers } from "@reduxjs/toolkit";
import { accountSlice } from "../slice/accountSlice";

export const rootReducer = combineReducers({
  account: accountSlice.reducer,
});
