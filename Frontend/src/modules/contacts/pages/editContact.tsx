import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { getContactbyId, updateContact } from "../../../services/contactServices";
import type { ContactForm } from "../../../types/contact";

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formContact, setFormContact] = useState<ContactForm>({
    full_name: "",
    email_address: "",
    phone_number: "",
  });

  const handleChange = (e: any) => {
    setFormContact({
      ...formContact,
      [e.target.name]: e.target.value,
    });
  };

  const fetchContact = async () => {
    try {
      setLoading(true);
      const result = await getContactbyId(Number(id));
      setFormContact(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchContact();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateContact(Number(id), formContact);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto">
        <div className="flex items-center gap-2 text-xl font-bold text-blue-900 mb-6">
          <AiFillEdit />
          Edit Contact
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : (
          <>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formContact.full_name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                name="email_address"
                value={formContact.email_address}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formContact.phone_number}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full cursor-pointer"
              >
                Update
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
