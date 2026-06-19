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
  const [sortBy, setSortBy] = useState("full_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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

      const result = await getContacts(currentPage, sortBy, sortOrder);

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
  }, [currentPage, sortBy, sortOrder]);

  const handleChangeContact = (e: any) => {
    setFormContact({
      ...formContact,
      [e.target.name]: e.target.value,
    });
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

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
        <div className="flex gap-3 mb-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded-lg cursor-pointer"
          >
            <option value="full_name">Full Name</option>
            <option value="email_address">Email</option>
            <option value="phone_number">Phone</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-900"
          >
            {sortOrder === "asc" ? "Ascending ↑" : "Descending ↓"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Contact List
            </h1>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded-xl w-full sm:w-auto cursor-pointer"
          >
            + Add Contact
          </button>
        </div>

        {loading && (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        )}

        {!loading && contacts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No contacts found
          </div>
        )}

        <div className="md:hidden space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="border rounded-xl p-4 shadow-sm">
              <div className="font-semibold text-blue-900">
                {contact.full_name}
              </div>
              <div className="text-sm text-gray-500">
                {contact.email_address}
              </div>
              <div className="text-sm text-gray-500">
                {contact.phone_number}
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/contacts/edit/${contact.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => {
                    setSelectedId(contact.id);
                    setOpenModalDelete(true);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50 text-blue-900">
                <th className="text-left px-4 py-3">No</th>
                <th className="text-left px-4 py-3">Full Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Phone</th>
                <th className="text-center px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact.id} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-3">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="px-4 py-3">{contact.full_name}</td>
                  <td className="px-4 py-3">{contact.email_address}</td>
                  <td className="px-4 py-3">{contact.phone_number}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => navigate(`/contacts/edit/${contact.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(contact.id);
                        setOpenModalDelete(true);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center gap-3 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            {currentPage} / {lastPage}
          </span>

          <button
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <ContactModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleChange={handleChangeContact}
          handleSubmit={handleSubmitContact}
          title="Add Contact"
          formContact={formContact}
        />
        <ContactModalConfirmation
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
          title="Delete Contact"
          description="Are you sure?"
          handleSubmit={handleDeleteContact}
        />
      </div>
    </>
  );
}
