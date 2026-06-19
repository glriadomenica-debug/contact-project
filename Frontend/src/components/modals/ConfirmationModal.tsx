interface ConfirmationModalProps {
  title: string;
  openModal: boolean;
  description: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}

export default function ConfirmationModal({
  openModal,
  setOpenModal,
  handleSubmit,
}: ConfirmationModalProps) {
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
          className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Delete Contact
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete this contact?
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSubmit}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg cursor-pointer transition"
            >
              Delete
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg cursor-pointer transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
