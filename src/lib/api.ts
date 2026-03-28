import { getEnv } from "../config/env.config";
import HttpClient from "./api-client";


const api = new HttpClient(getEnv.BASE_URL);

export default api;