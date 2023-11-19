import axios, { InternalAxiosRequestConfig } from "axios";

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
