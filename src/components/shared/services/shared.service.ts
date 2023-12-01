import { EventEmitter } from "fbemitter";
import { httpClient } from "./interceptor/axios.interceptor";

export const emitter = new EventEmitter();

export const findAllArticles = () => httpClient.get("/articles");
