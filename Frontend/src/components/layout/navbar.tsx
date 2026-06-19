import { AiFillContacts } from "react-icons/ai";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-lg sm:text-xl">
          <AiFillContacts /> Contact Book
        </div>

       
      </div>
    </header>
  );
}
