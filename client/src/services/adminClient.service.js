import api from "./api";

export const getClients = async (search = "") => {
  const params = search ? { search } : {};
  const response = await api.get("/admin/clients", { params });
  return response.data;
};

export const getClientById = async (id) => {
  const response = await api.get(`/admin/clients/${id}`);
  return response.data;
};

export const sendAdminMessage = async (clientId, text) => {
  const response = await api.post(`/admin/clients/${clientId}/messages`, { text });
  return response.data;
};

export const markClientMessagesRead = async (clientId) => {
  const response = await api.put(`/admin/clients/${clientId}/messages/read`);
  return response.data;
};

export const createClientInvoice = async (clientId, data) => {
  const response = await api.post(`/admin/clients/${clientId}/invoices`, data);
  return response.data;
};

export const updateClientInvoice = async (clientId, invoiceId, data) => {
  const response = await api.put(`/admin/clients/${clientId}/invoices/${invoiceId}`, data);
  return response.data;
};

export const recordClientPayment = async (clientId, data) => {
  const response = await api.post(`/admin/clients/${clientId}/payments`, data);
  return response.data;
};

export const updateClientProject = async (clientId, projectId, data) => {
  const response = await api.put(`/admin/clients/${clientId}/projects/${projectId}`, data);
  return response.data;
};

export const assignProjectToClient = async (clientId, projectId) => {
  const response = await api.post(`/admin/clients/${clientId}/projects`, { projectId });
  return response.data;
};
