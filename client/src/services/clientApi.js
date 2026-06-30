import axios from "axios";

const normalizeBaseURL = (value) => {
  if (!value) return null;
  const trimmed = value.trim().replace(/\/$/, "");
  if (!trimmed) return null;
  if (trimmed.endsWith("/api")) return trimmed;
  if (trimmed === "/") return "/api";
  if (trimmed.startsWith("/")) return `${trimmed}/api`;
  return `${trimmed}/api`;
};

const getApiBaseURL = () => {
  const configuredURL = normalizeBaseURL(import.meta.env.VITE_API_URL);
  if (import.meta.env.PROD) {
    if (configuredURL) return configuredURL;
    return "https://snaplifye.onrender.com/api";
  }
  if (configuredURL) return configuredURL;
  return "http://localhost:5000/api";
};

const clientApi = axios.create({
  baseURL: getApiBaseURL(),
  headers: { "Content-Type": "application/json" },
});

clientApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("clientToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("clientToken");
      localStorage.removeItem("client");
      window.location.href = "/client/login";
    }
    return Promise.reject(error);
  }
);

export default clientApi;
