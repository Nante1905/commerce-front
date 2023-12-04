import { Article } from "../../../types/item.type";
import { BonCommande } from "../../bon-de-commande/types/bon-commande.types";

export interface Fournisseur {
  id: number;
  nom: string;
  reference: string;
  email: string;
  telephone: string;
}

export interface Direction {
  id: number;
  nom: string;
  code: string;
}

export interface Employe {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  dateEmbauche: string;
  email: string;
  codePoste: string;
  direction: Direction;
}

export interface BonLivraison {
  id: number;
  reference: string;
  bonDeCommande: BonCommande;
  jourSortie: string;
  jourReception: string;
  employe: Employe;
  details: BonLivraisonDetail[];
}

interface BonLivraisonDetail {
  article: Article;
  qte: number;
}
