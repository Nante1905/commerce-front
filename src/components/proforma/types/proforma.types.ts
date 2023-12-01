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
