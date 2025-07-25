import axios from "axios";
// Create axios instance
const apiClient = axios.create({
    baseURL: "/api"
});

export default apiClient;