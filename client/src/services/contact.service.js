import api from "./api";

// Send Contact Message
export const createContact = async (data) => {
  const res = await api.post("/contact", data);
  return res.data;
};

// Get All Contacts
export const getAllContacts = async () => {
  const res = await api.get("/contact");
  return res.data;
};

// Delete Contact
export const deleteContact = async (id) => {
  const res = await api.delete(`/contact/${id}`);
  return res.data;
};

// Update Status
export const updateContactStatus = async (id, status) => {
  const res = await api.patch(`/contact/${id}/status`, {
    status,
  });

  return res.data;
};