import { LoginRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";

export const login = (data: LoginRequest) => {
  return apiClient.post("/auth/login", data);
} 

export const getLoginUser = () => {
  return apiClient.get("/profile/get/login-user");
}

export const forgotPassword = (data: {email: string}) => {
  return apiClient.post("/auth/forgot-password", data);
}

export const forgotPasswordVerify = (data: {token: string | null, otp: number | string}) => {
  return apiClient.post("/auth/forgot-password-verify", data);
}

export const newPassword = (data: {token: string|null, password: string}) => {
  return apiClient.post("/auth/new-password", data);
}

export const changePassword = (data: {token: string|null, oldPassword: string|null, newPassword: string}) => {
  return apiClient.post("/auth/change-password", data);
}
