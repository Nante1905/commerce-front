export interface Direction {
    id: number,
    nom?: string
}

export interface Categorie {
    id: number,
    nom: string
}

export interface Article {
    id: number,
    reference?: string,
    designation?: string,
    categorie?: Categorie
}