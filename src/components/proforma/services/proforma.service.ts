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
