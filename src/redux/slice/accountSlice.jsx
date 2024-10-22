import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },

    doLogoutAction: (state) => {
      localStorage.removeItem("accessToken");
      state.isAuthenticated = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {},
});

export const { doLoginAction, doGetAccountAction, doLogoutAction } =
  accountSlice.actions;
export const useAccount = () => {
  return useSelector((state) => state.account);
};
export default accountSlice.reducer;
