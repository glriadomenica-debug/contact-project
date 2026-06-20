import api from "../utils/api";
import type {
  Contact,
  ContactForm,
  ApiResponse,
  ContactPagination,
} from "../types/contact";

export const getContacts = async (
  page = 1,
  sortBy = "full_name",
  sortOrder = "asc",
  search = ""
): Promise<ApiResponse<ContactPagination>> => {
  const response = await api.get(
    `/contacts?page=${page}&sort_by=${sortBy}&sort_order=${sortOrder}&seacrh=${search}`,
  );

  return response.data;
};

export const getContactbyId = async (id: number) => {
  const response = await api.get(`/contacts/${id}`);
  return response.data;
};

export const createContact = async (data: ContactForm) => {
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
