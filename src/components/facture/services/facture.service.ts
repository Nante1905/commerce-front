import { httpClient } from "../../shared/services/interceptor/axios.interceptor";

export const insertFacture = (form: any) => httpClient.post("/factures", form);
