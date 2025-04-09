import { FC } from "react";

interface NavbarProps {
  button: boolean;
  setButton: (value: boolean) => void;
}

const Navbar: FC<NavbarProps> = ({ button, setButton }) => {
  return (
    <div className="h-20 w-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md flex items-center justify-between px-6">
      <h1 className="text-white text-2xl font-bold">Blank Sheet</h1>
      <button
        onClick={() => setButton(true)}
        className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Share
      </button>
    </div>
  );
};

export default Navbar;