import { httpClient } from "../../shared/services/interceptor/axios.interceptor";

export const findAllBonCommandeValides = () =>
  httpClient.get("/bon-commande/valides");

export const insertBonLivraison = (data: any) =>
  httpClient.post("/bon-livraison", data);
