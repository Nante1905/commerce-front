import { httpClient } from "../../shared/services/interceptor/axios.interceptor";

export const findAllBonCommandeNonValider = () =>
  httpClient.get("/bon-commande");

export const findBonCommandeById = (id: string) =>
  httpClient.get("/bon-commande/" + id);
