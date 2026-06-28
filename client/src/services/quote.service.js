import api from "./api";

export const submitQuote = async (data) => {
  const response = await api.post("/quotes", data);
  return response.data;
};

export const getAllQuotes = async () => {
  const response = await api.get("/quotes");
  return response.data;
};

export const updateQuoteStatus = async (id, status) => {
  const response = await api.patch(`/quotes/${id}/status`, {
    status,
  });

  return response.data;
};

export const deleteQuote = async (id) => {
  const response = await api.delete(`/quotes/${id}`);
  return response.data;
};