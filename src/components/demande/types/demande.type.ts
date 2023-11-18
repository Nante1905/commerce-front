import { Article, Direction } from "../../../types/item.type";

interface DetailsDemande {
    article: Article,
    quantite: number,
    status: number
}

export interface Demande {
    id: number,
    reference: string,
    jour: string,
    estOuvert: boolean,
    direction: Direction,
    details: DetailsDemande[]
}