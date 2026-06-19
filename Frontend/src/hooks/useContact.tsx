import * as contactService from "../services/contactServices";

export const useContact = () => {
  return {
    getContacts: contactService.getContacts,
    getContactbyId: contactService.getContactbyId,
    createContact: contactService.createContact,
    updateContact: contactService.updateContact,
    deleteContact: contactService.deleteContact,
  };
};
