import axios from "axios";

const getApiBaseURL = () => {
  const configuredURL = import.meta.env.VITE_API_URL?.trim();

  if (import.meta.env.PROD) {
    if (!configuredURL || configuredURL.includes("localhost") || configuredURL.includes("127.0.0.1")) {
      return "/api";
    }

    return configuredURL.replace(/\/$/, "");
  }

  if (configuredURL) {
    return configuredURL.replace(/\/$/, "");
  }

  return "http://localhost:5000/api";
};

const api = axios.create({
  baseURL: getApiBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;