import { httpClient } from "../../shared/services/interceptor/axios.interceptor";
import { ModePaiement } from "../types/bon-commande.types";

export const findAllBonCommandeNonValider = () =>
  httpClient.get("/bon-commande");

export const findBonCommandeById = (id: string) =>
  httpClient.get("/bon-commande/" + id);

export const findAllPaiement = () => httpClient.get("/paiement");
export const validerBonDeCommande = (id: string, paiement: string) =>
  httpClient.post(`/bon-commande/${id}/valider`, {
    id: paiement,
  });
