import { Fournisseur } from "../../shared/types/model.types";

export interface ProformaState {
  fournisseurs: Fournisseur[];
  articlesIds: number[];
  demandesIds: number[];
  formError: boolean;
  modal: {
    sendSuccess: boolean;
    sendLoading: boolean;
    message: string;
  };
}

export const initialState = {
  fournisseurs: [],
  articlesIds: [],
  demandesIds: [],
  formError: false,
  modal: {
    sendSuccess: false,
    sendLoading: false,
    message: "",
  },
};

interface DemandeProforma {
  id: number;
  reference: string;
  delaiLivraison: string;
  jourDemande: string;
}

export interface DemandeProformaDetails {
  id: number;
  fournisseur: Fournisseur;
  reference: string;
  demandeProforma: DemandeProforma;
  etat: number;
}
