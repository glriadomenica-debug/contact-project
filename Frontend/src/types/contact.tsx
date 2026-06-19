export interface Contact {
  id: number;
  full_name: string;
  email_address: string;
  phone_number: string;
}
export interface ContactForm {
  full_name: string;
  email_address: string;
  phone_number: string;
}

export interface ContactPagination {
  current_page: number;
  last_page: number;
  data: Contact[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
