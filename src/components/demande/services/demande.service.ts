import { httpClient } from "../../shared/services/interceptor/axios.interceptor";

export const findAllDemandes = () => httpClient.get("/demandes");
