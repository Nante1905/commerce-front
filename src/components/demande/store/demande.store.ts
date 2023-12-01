import { configureStore } from "@reduxjs/toolkit";
import { DemandeSlice } from "./slice/demande.slice";
import { DemandeNatureSlice } from "./slice/demandeNature.slice";
import { authenticationReducer } from "../../authentication/store/authentication.reducer";

export const demandeStore = configureStore({
  reducer: {
    demande: DemandeSlice.reducer,
    demandeNature: DemandeNatureSlice.reducer,
    authetication: authenticationReducer.reducer,
  },
});

export type DemandeStore = ReturnType<typeof demandeStore.getState>;
