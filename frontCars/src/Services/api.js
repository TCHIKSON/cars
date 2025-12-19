import { ApiService } from "./api.service";
const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token") || "";

export const api = new ApiService(API_URL, token);
