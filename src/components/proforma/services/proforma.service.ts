import { httpClient } from "../../shared/services/interceptor/axios.interceptor";

export const findFournisseurOf = (articles: number[]) =>
  httpClient.post("/fournisseurs/articles", {
    articles: articles,
  });

export const sendDemande = (
  livraison: string,
  fournisseurs: number[],
  demandes: number[]
) =>
  httpClient.post("/fournisseurs/demande-proforma", {
    livraison: livraison,
    fournisseurs: fournisseurs,
    demandes: demandes,
  });

export const findProformaSansReponse = () =>
  httpClient.get("/proforma/sans-reponse");

export const sendReponse = (id, form) =>
  httpClient.post(`/proforma/${id}/reponse`, {
    delaiLivraison: form.delaiLivraison,
    formatPrix: form.formatPrix,
    details: form.details,
  });

export const findProformaWithReponse = () =>
  httpClient.get("/proforma/avec-reponse");

export const genererBonDeCommande = (proformaId) =>
  httpClient.get(`/proforma/${proformaId}/bon-commande`);
