import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.API_BASE_URL;

const apiServer = axios.create({
  baseURL: baseURL,
});

// Interceptor to attach token
apiServer.interceptors.request.use(async (config: any) => {
    const token = (await cookies()).get('token')?.value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiServer;
