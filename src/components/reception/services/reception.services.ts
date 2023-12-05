import { httpClient } from "../../shared/services/interceptor/axios.interceptor";

export const insertBonReception = (form: any) =>
  httpClient.post("/bon-reception", form);
export const findAllBonReception = () => httpClient.get("/bon-reception");
export const findAllBonReceptionById = (id: any) =>
  httpClient.get(`/bon-reception/${id}`);
