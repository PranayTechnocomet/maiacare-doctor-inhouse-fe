import { LoginRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";

export const login = (data: LoginRequest) => {
  return apiClient.post("/auth/login", data);
} 