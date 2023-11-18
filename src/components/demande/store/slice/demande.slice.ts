import { createSlice } from "@reduxjs/toolkit";
import { Article, Direction } from "../../../../types/item.type";
import _ from "lodash";

interface DetailsDemandeMin {
    article: Article
    quantite: number
}

interface DemandeBesoinForm {
    direction: number,
    details: DetailsDemandeMin[]
}

interface DemandeState {
    directions: Direction[],
    articles: Article[],
    form: DemandeBesoinForm
}

const initialState: DemandeState = {
    directions: [],
    articles: [],
    form: {
        direction: 0,
        details: [{
            article: { id: 0 },
            quantite: 0
        }]
    }
}

export const DemandeSlice = createSlice({
    name: 'demande',
    initialState,
    reducers: {
        setDirections: (state, action) => {
            state.directions = action.payload;
        },
        setArticles: (state, action) => {
            state.articles = action.payload
        },
        setBesoinDirection: (state, action) => {
            state.form.direction = action.payload
        },
        addDetails: (state) => {
            state.form.details.push({
                article: {
                    id: 0
                },
                quantite: 0
            })
        },
        setBesoinArticle: (state, action) => {
            state.form.details[action.payload.index].article.id = action.payload.value as number
        },
        setBesoinQte: (state, action) => {
            state.form.details[action.payload.index].quantite = action.payload.value as number
        },
        dropBesoin: (state, action) => {
            _.remove(
                state.form.details,
                (value, index) => index === action.payload
            );
        }
    }
});

export const {
    setDirections, setArticles, setBesoinDirection, addDetails, setBesoinArticle, setBesoinQte, dropBesoin
} = DemandeSlice.actions;