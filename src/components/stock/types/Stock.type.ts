import { Article } from "../../../types/item.type"

export interface DetailsEtatStock {
    article: Article,
    qteInitial: number,
    qteEntre: number,
    qteSortie: number,
    montantInitial?: number,
    montantEntre?: number,
    montantSortie?: number,
    reste: number,
    montant?: number
}

export interface EtatStock {
    debut: string | null,
    fin: string | null,
    details: DetailsEtatStock[],
    avecMontant: boolean,
    montantTotal?: number
}

export interface EtatStockInput {
    debut: string | null,
    fin: string | null,
    article: string
}