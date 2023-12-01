import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user.type";
export interface AuthenticationState {
  user?: User;
}

const initialState: AuthenticationState = {
  user: undefined,
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
  },
});

export const authenticationActions = authenticationReducer.actions;
