import { Article } from "../../../types/item.type";
import { Fournisseur } from "../../shared/types/model.types";

export interface BonCommande {
  id: number;
  reference: string;
  dateCreation: string;
  livraisonPartielle: boolean;
  delaiLivraison: string;
  status: number;
  paiement: number;
  fournisseur: Fournisseur;
  details: BonCommandeDetails[];
}

export interface BonCommandeDetails {
  id: number;
  article: Article;
  quantite: number;
  puHt: number;
  puTTC: number;
  tva: number;
}
