import { FaBars } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Navbar = ({ isOpen, toggleSidebar }) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isOpen ? 'ml-64' : ''
      } bg-white text-black p-4 flex justify-between items-center`}
    >
      <div className="flex items-center">
        <button className="p-2" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <input
          type="search"
          placeholder="search"
          className="ml-4 p-2 border w-52 border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex items-center">
        <button className="pr-4">
          <IoMdNotificationsOutline size={24} />
        </button>
        <button>
          <img src="./public/assets/avatar-1.jpg" alt="User Avatar" className="w-12 rounded-full" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
