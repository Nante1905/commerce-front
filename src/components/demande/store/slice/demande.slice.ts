import { createSlice } from "@reduxjs/toolkit";
import { Article, Direction } from "../../../../types/item.type";
import _ from "lodash";
import { Demande } from "../../../shared/types/demande.type";

interface DetailsDemandeMin {
  idArticle: number;
  quantite: number;
}

interface DemandeBesoinForm {
  direction: Direction;
  details: DetailsDemandeMin[];
}

export interface DemandeState {
  directions: Direction[];
  articles: Article[];
  form: DemandeBesoinForm;
  demandes: Demande[];
}

const initialState: DemandeState = {
  directions: [],
  articles: [],
  form: {
    direction: { id: 0 },
    details: [
      {
        idArticle: 0,
        quantite: 0,
      },
    ],
  },
  demandes: [],
};

export const DemandeSlice = createSlice({
  name: "demande",
  initialState,
  reducers: {
    setDirections: (state, action) => {
      state.directions = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setBesoinDirection: (state, action) => {
      state.form.direction.id = action.payload;
    },
    addDetails: (state) => {
      state.form.details.push({
        idArticle: 0,
        quantite: 0,
      });
    },
    setBesoinArticle: (state, action) => {
      state.form.details[action.payload.index].idArticle = action.payload
        .value as number;
    },
    setBesoinQte: (state, action) => {
      state.form.details[action.payload.index].quantite = action.payload
        .value as number;
    },
    dropBesoin: (state, action) => {
      _.remove(state.form.details, (value, index) => index === action.payload);
    },
    findDemandeSuccess: (state, action) => {
      state.demandes = action.payload;
    },
  },
});

export const {
  setDirections,
  setArticles,
  setBesoinDirection,
  addDetails,
  setBesoinArticle,
  setBesoinQte,
  dropBesoin,
  findDemandeSuccess,
} = DemandeSlice.actions;
