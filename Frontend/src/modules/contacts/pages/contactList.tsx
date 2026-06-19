import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ContactModal from "../../../components/modals/ContactModals";
import ContactModalConfirmation from "../../../components/modals/ConfirmationModal";
import {
  createContact,
  deleteContact,
  getContacts,
} from "../../../services/contactServices";
import type { Contact, ContactForm } from "../../../types/contact";

export default function ListContact() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formContact, setFormContact] = useState<ContactForm>({
    full_name: "",
    email_address: "",
    phone_number: "",
  });
  

  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      setLoading(true);

      const result = await getContacts(currentPage);

      setContacts(result.data.data);
      setLastPage(result.data.last_page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage]);

  const handleChangeContact = (e: any) => {
    setFormContact({
      ...formContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteContact = async () => {
    try {
      if (!selectedId) return;

      await deleteContact(selectedId);

      fetchContacts();
      setOpenModalDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitContact = async () => {
    if (
      !formContact.full_name.trim() ||
      !formContact.email_address.trim() ||
      !formContact.phone_number.trim()
    ) {
      alert("All fields are required");
      return;
    }

    try {
      await createContact(formContact);

      fetchContacts();

      setOpenModal(false);

      setFormContact({
        full_name: "",
        email_address: "",
        phone_number: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Contact List</h1>
            <p className="text-sm text-gray-500">Manage Contacts</p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-xl transition cursor-pointer"
          >
            + Add New Contact
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th className="text-left px-4 py-3 rounded-l-xl">No</th>

                <th className="text-left px-4 py-3">Full Name</th>

                <th className="text-left px-4 py-3">Email Address</th>

                <th className="text-left px-4 py-3">Phone Number</th>

                <th className="text-center px-4 py-3 rounded-r-xl">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <tr
                    key={contact.id}
                    className="border-b border-gray-100 hover:bg-orange-50 transition"
                  >
                    <td className="px-4 py-4">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {contact.full_name}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {contact.email_address}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {contact.phone_number}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                          onClick={() =>
                            navigate(`/contacts/edit/${contact.id}`)
                          }
                        >
                          <AiFillEdit />
                        </button>

                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                          onClick={() => {
                            setSelectedId(contact.id);
                            setOpenModalDelete(true);
                          }}
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-lg text-white transition ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Prev
          </button>

          <span className="font-medium text-gray-700">
            Page {currentPage} of {lastPage}
          </span>

          <button
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-lg text-white transition ${
              currentPage === lastPage
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <ContactModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleChange={handleChangeContact}
        handleSubmit={handleSubmitContact}
        title="Add New Contact"
        formContact={formContact}
      />

      <ContactModalConfirmation
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        title="Delete Contact"
        description="Are you sure you want to delete this contact?"
        handleSubmit={handleDeleteContact}
      />
    </>
  );
}
