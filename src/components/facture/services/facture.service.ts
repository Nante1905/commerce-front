import { httpClient } from "../../shared/services/interceptor/axios.interceptor";

export const insertFacture = (form: any) => httpClient.post("/factures", form);
export const findAllFactures = () => httpClient.get("/factures");
export const findAllFactureById = (id: string) =>
  httpClient.get("/factures/" + id);
export const validerFacture = (id: string) =>
  httpClient.get(`/factures/${id}/valider`);
