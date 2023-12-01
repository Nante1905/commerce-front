import { httpClient } from "../../shared/services/interceptor/axios.interceptor";
import { UserCredentials } from "../types/user.type";

export const login = (auth: UserCredentials) =>
  httpClient.post("/auth/login", auth);
