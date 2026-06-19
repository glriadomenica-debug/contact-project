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
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          openModal ? "" : "hidden"
        }`}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative bg-white p-6 rounded-lg w-80">
          <h2 className="font-bold text-lg mb-3">Delete Contact</h2>

          <p className="mb-5">Are you sure you want to delete this contact?</p>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleSubmit}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
