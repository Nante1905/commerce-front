import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "./authentication.reducer";

export const authenticationStore = configureStore({
  reducer: {
    authentication: authenticationReducer.reducer,
  },
});

export type AuthenticationStore = ReturnType<
  typeof authenticationStore.getState
>;
