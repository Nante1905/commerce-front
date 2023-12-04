import { EtatStock } from "./Stock.type";

export interface EtatStockState {
    stocks: EtatStock | null,
    error: string | null
}
