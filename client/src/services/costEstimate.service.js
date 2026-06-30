import api from "./api";

export const calculateCost = async (data) => {
  const res = await api.post("/cost-estimate", data);
  return res.data;
};
