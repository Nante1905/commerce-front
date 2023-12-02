import axios, { InternalAxiosRequestConfig } from "axios";
import { authenticationStore } from "../../../authentication/store/authentication.store";
import { authenticationActions } from "../../../authentication/store/authentication.reducer";

export const httpClient = axios.create({
  baseURL: "http://localhost:8080",
});
httpClient.interceptors.request.use(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: InternalAxiosRequestConfig<any>
  ) => {
    if (config.url?.includes("login")) return config;
    else {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    }
  },
  (err) => Promise.reject(err)
);

httpClient.interceptors.response.use(
  (response) => {
    if (response.status === 403) {
      authenticationStore.dispatch(authenticationActions.forbidden());
      console.log("Forbidden");
    }
    return response;
  },
  (err) => {
    if (err.response.status === 403) {
      authenticationStore.dispatch(authenticationActions.forbidden());
      console.log("Forbidden");
    }
    return Promise.reject(err);
  }
);
