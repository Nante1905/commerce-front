import { createSlice } from "@reduxjs/toolkit";
import { DemandeParNature } from "../../../shared/types/demande.type";
import _ from 'lodash';
import { Details } from "@mui/icons-material";

export interface SelectedDetails {
    article: number,
    demande: number,
}

export interface DemandeNatureState {
    demandes: DemandeParNature[],
    selected: SelectedDetails[],
    rejected: SelectedDetails[],
    checkable: boolean
}

const initialState: DemandeNatureState = {
    demandes: [],
    selected: [],
    rejected: [],
    checkable: false
}

export const DemandeNatureSlice = createSlice({
    name: 'DemandeNature',
    initialState,
    reducers: {
        setChecking: (state, action) => {
            state.checkable = action.payload
        },
        setDemandeNature: (state, action) => {
            state.demandes = action.payload
            state.demandes.map((d, iDemande) => {
                state.demandes[iDemande].selected = false;
                d.details.map((details, iDetails) => {
                    state.demandes[iDemande].details[iDetails].selected = false;
                })
            })
        },
        toggleDemande: (state, action) => {
            // mandray id sy idDetails
            const iDemande = action.payload.iDemande;
            const iDetails = action.payload.iDetails;
            console.log('TTOOOGGLE');
            let addTotal = state.demandes[iDemande].details[iDetails].quantite;

            if (state.demandes[iDemande].details[iDetails].selected) {
                addTotal *= -1;
            }
            const checked = state.demandes[action.payload.iDemande].details[action.payload.iDetails].selected;

            state.demandes[action.payload.iDemande].details[action.payload.iDetails].selected = !checked;
            state.demandes[iDemande].total += addTotal
        },
        toggleMainDemande: (state, action) => {
            // mandray index demandeNature
            const status = state.demandes[action.payload].selected
            let total = 0;
            state.demandes[action.payload].details.map((d, index) => {
                state.demandes[action.payload].details[index].selected = !status
                if (status == false) {
                    total += state.demandes[action.payload].details[index].quantite;
                }
            })

            state.demandes[action.payload].total = total;
            state.demandes[action.payload].selected = !status;

        }
    }
})

export const { setDemandeNature, toggleDemande, toggleMainDemande, setChecking } = DemandeNatureSlice.actions