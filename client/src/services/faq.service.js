import api from "./api";

export const getPublicFAQs = async () => {
  const res = await api.get("/faqs/public");
  return res.data;
};

export const getAllFAQs = async (search) => {
  const params = search ? { search } : {};
  const res = await api.get("/faqs", { params });
  return res.data;
};

export const getFAQById = async (id) => {
  const res = await api.get(`/faqs/${id}`);
  return res.data;
};

export const createFAQ = async (data) => {
  const res = await api.post("/faqs", data);
  return res.data;
};

export const updateFAQ = async (id, data) => {
  const res = await api.put(`/faqs/${id}`, data);
  return res.data;
};

export const deleteFAQ = async (id) => {
  const res = await api.delete(`/faqs/${id}`);
  return res.data;
};
