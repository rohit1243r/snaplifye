import clientApi from "./clientApi";

export const loginClient = async (data) => {
  const response = await clientApi.post("/client/auth/login", data);
  return response.data;
};

export const registerClient = async (data) => {
  const response = await clientApi.post("/client/auth/register", data);
  return response.data;
};

export const getClientProfile = async () => {
  const response = await clientApi.get("/client/auth/profile");
  return response.data;
};

export const updateClientProfile = async (data) => {
  const response = await clientApi.put("/client/auth/profile", data);
  return response.data;
};

export const googleLogin = async (accessToken) => {
  const response = await clientApi.post("/auth/google", { accessToken });
  return response.data;
};
