import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user.type";
export interface AuthenticationState {
  user?: User;
  forbidden: boolean;
}

const initialState: AuthenticationState = {
  user: undefined,
  forbidden: false,
};

export const authenticationReducer = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    verifySuccess: (state, action) => {
      state.user = action.payload;
    },
    forbidden: (state) => {
      state.forbidden = true;
    },
    forbiddenClose: (state) => {
      state.forbidden = false;
    },
  },
});

export const authenticationActions = authenticationReducer.actions;
