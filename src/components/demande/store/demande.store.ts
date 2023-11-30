import { configureStore } from "@reduxjs/toolkit";
import { DemandeSlice } from "./slice/demande.slice";
import { DemandeNatureSlice } from "./slice/demandeNature.slice";

export const demandeStore = configureStore({
    reducer: {
        demande: DemandeSlice.reducer,
        demandeNature: DemandeNatureSlice.reducer
    }
});

export type DemandeStore = ReturnType<typeof demandeStore.getState>