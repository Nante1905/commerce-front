import { createSlice } from "@reduxjs/toolkit";
import { DemandeParNature } from "../../types/demande.type";

export interface DemandeNatureState {
    demandes: DemandeParNature[]
}

const initialState: DemandeNatureState = {
    demandes: []
}

export const DemandeNatureSlice = createSlice({
    name: 'DemandeNature',
    initialState,
    reducers: {
        setDemandeNature: (state, action) => {
            state.demandes = action.payload
        }
    }
})

export const { setDemandeNature } = DemandeNatureSlice.actions