interface ContactModalProps {
  title: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  handleChange: (e: any) => void;
  formContact: {
    full_name: string;
    email_address: string;
    phone_number: string;
  };
}

export default function ContactModal({
  title,
  openModal,
  setOpenModal,
  handleSubmit,
  handleChange,
  formContact,
}: ContactModalProps) {
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          openModal ? "" : "hidden"
        }`}
        onClick={() => setOpenModal(false)}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div
          className="relative bg-white p-6 rounded-lg w-96"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-bold mb-4">{title}</h2>

          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formContact.full_name}
            onChange={handleChange}
            className={`w-full border p-2 rounded `}
          />

          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email_address"
            placeholder="Email Address"
            value={formContact.email_address}
            onChange={handleChange}
            className={`w-full border p-2 rounded`}
          />

          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formContact.phone_number}
            onChange={handleChange}
            className={`w-full border p-2 rounded`}
          />

          <div className="flex justify-end mt-1 gap-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Save
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
