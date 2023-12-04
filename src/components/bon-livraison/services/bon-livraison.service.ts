import { httpClient } from "../../shared/services/interceptor/axios.interceptor";

export const findAllBonCommandeValides = () =>
  httpClient.get("/bon-commande/valides");

export const insertBonLivraison = (data: any) =>
  httpClient.post("/bon-livraison", data);

export const findAllBonLivraisons = () => httpClient.get("/bon-livraison");
export const findBonLivraison = (id: string) =>
  httpClient.get("/bon-livraison/" + id);
