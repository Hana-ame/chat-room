import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Transition } from '@headlessui/react'; // For animations
// import { XIcon, MenuIcon } from '@heroicons/react/outline'; // For icons
const Sidebar = ({ isOpen, setIsOpen }) => {
  const linkClass = "block p-4 text-gray-900 hover:bg-gray-100";

  return (
    <aside className={`
      fixed inset-y-0 right-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      lg:relative lg:translate-x-0
    `}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex justify-between items-center lg:justify-center">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            {"Close Menu"}
          </button>
        </div>
        <nav className="flex-1 overflow-auto">
          <Link to="/" className={linkClass} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/profile" className={linkClass} onClick={() => setIsOpen(false)}>Profile</Link>
          <Link to="/register" className={linkClass} onClick={() => setIsOpen(false)}>Register</Link>
          <Link to="/login" className={linkClass} onClick={() => setIsOpen(false)}>Login</Link>
        </nav>
      </div>
    </aside>
  );
};


export default Sidebar;
