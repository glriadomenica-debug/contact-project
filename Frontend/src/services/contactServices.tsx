import api from "../utils/api";

interface Contact {
  id: number;
  full_name: string;
  email_address: string;
  phone_number: string;
}

export const getContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};

export const getContactbyId = async (id: number) => {
  const response = await api.get(`/contacts/${id}`);
  return response.data;
};

export const createContact = async (data: Contact) => {
  const response = await api.post("/contacts", data);
  return response.data;
};

export const updateContact = async (id: number, data: Partial<Contact>) => {
  const response = await api.put(`/contacts/${id}`, data);
  return response.data;
};

export const deleteContact = async (id: number) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};
