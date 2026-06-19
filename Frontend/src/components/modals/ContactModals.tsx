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
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 ${
          openModal ? "block" : "hidden"
        }`}
        onClick={() => setOpenModal(false)}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div
          className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-5">{title}</h2>

          <div className="mb-4">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formContact.full_name}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email_address"
              value={formContact.email_address}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formContact.phone_number}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 cursor-pointer rounded-lg transition"
            >
              Save
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 cursor-pointer rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
