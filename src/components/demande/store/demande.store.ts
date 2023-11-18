import { configureStore } from "@reduxjs/toolkit";
import { DemandeSlice } from "./slice/demande.slice";

export const demandeStore = configureStore({
    reducer: {
        demande: DemandeSlice.reducer,
    }
});

export type DemandeStore = ReturnType<typeof demandeStore.getState>