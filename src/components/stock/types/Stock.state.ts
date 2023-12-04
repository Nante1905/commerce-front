import { Article, Direction } from "../../../types/item.type";
import { EtatStock, SortieStock, TypeSortie } from "./Stock.type";

export interface EtatStockState {
    stocks: EtatStock | null,
    error: string | null
}

export interface SortieStockState {
    types: TypeSortie[],
    directions: Direction[],
    articles: Article[],
    error: string,
    message: string,
}
