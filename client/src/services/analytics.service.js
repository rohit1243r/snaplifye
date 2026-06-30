import api from "./api";

export const getAnalytics = async () => {
  const res = await api.get("/dashboard/analytics");
  return res.data;
};
