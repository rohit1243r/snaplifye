import clientApi from "./clientApi";

export const getClientDashboard = async () => {
  const response = await clientApi.get("/client/dashboard");
  return response.data;
};

export const getMessages = async () => {
  const response = await clientApi.get("/client/messages");
  return response.data;
};

export const sendMessage = async (text) => {
  const response = await clientApi.post("/client/messages", { text });
  return response.data;
};

export const markMessagesRead = async () => {
  const response = await clientApi.put("/client/messages/read");
  return response.data;
};

export const getInvoices = async () => {
  const response = await clientApi.get("/client/invoices");
  return response.data;
};

export const getPayments = async () => {
  const response = await clientApi.get("/client/invoices/payments");
  return response.data;
};
