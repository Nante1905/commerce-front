import { Article, Direction } from "../../../types/item.type";

interface DetailsDemande {
  article: Article;
  quantite: number;
  status: number;
}

export interface Demande {
  id: number;
  reference: string;
  jour: string;
  etat: number;
  direction: Direction;
  details: DetailsDemande[];
}

export interface DetailsDemandeParNature {
  direction: Direction;
  status: number;
  quantite: number;
  idDemande: number;
  jour: string;
  selected?: boolean;
}

export interface DemandeParNature {
  article: Article;
  details: DetailsDemandeParNature[];
  total: number;
  selected?: boolean;
}