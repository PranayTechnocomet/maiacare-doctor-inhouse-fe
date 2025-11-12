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

export const changePassword = (data: {oldPassword: string, newPassword: string}) => {
  return apiClient.post("/profile/change-password", data);
}

export const getLoggedInDevice = (data: {token: string|null}) => {
  return apiClient.post("/profile/list-login-device", {} , {
    headers : {
      Authorization: `Bearer ${data.token}`,
    }
  });
}

export const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/profile/get", {
    headers : {
      Authorization: `Bearer ${token}`,
    }
  });
}
type QualificationType = {
  degree: string;
  fieldOfStudy: string;
  university: string;
  startYear: number;
  endYear: number;
};

export const addQualification = (data:QualificationType) => {
  const token = localStorage.getItem("token");
  return apiClient.post("/profile/qualifications/add", data, {
    headers : {
      Authorization: `Bearer ${token}`,
    }
  });
}
