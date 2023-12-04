import { Article, Direction } from "../../../types/item.type"
import { Employe } from "../../shared/types/model.types"

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

export interface TypeSortie {
    id: number,
    nom?: string
}

export interface DetailsSortieStock {
    article: Article,
    qte: number
}

export interface SortieStock {
    jour: string | null,
    type: TypeSortie | null,
    destinataire: Direction | null,
    details: DetailsSortieStock[],
    employe?: Employe,
    direction?: Direction
}

export interface EntreStock {
    id?: number,
    jour: string | null,
    bonReception: BonReception | null,
    employe?: Employe,
    details: DetailsSortieStock[]
}

export interface BonSortie {
    id: number,
    reference: string,
    sortie: SortieStock,
}

export interface BonReceptionDetails extends DetailsSortieStock { }

export interface BonReception {
    id: number,
    reference?: string,
    jour?: string,
    employe?: Employe,
    details?: BonReceptionDetails[]
}

export interface BonEntre {
    id: number,
    reference: string,
    entre: EntreStock
}