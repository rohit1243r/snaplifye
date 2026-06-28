import api from "./api";

export const submitQuote = async (data) => {
  const response = await api.post("/quotes", data);
  return response.data;
};