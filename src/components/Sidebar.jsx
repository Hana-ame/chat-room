import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Transition } from '@headlessui/react'; // For animations
// import { XIcon, MenuIcon } from '@heroicons/react/outline'; // For icons

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={classNames([
      'fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
      `${isOpen ? 'translate-x-0' : '-translate-x-full'}`,
      'lg:relative lg:translate-x-0',
    ])}>
      {/* Sidebar */}
      <div className="flex flex-col flex-1">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link to="/"
            className="block p-4 text-gray-900 hover:bg-gray-100">Home</Link>
          <Link to="/profile"
            className="block p-4 text-gray-900 hover:bg-gray-100">Profile</Link>
          <Link to="/register"
            className="block p-4 text-gray-900 hover:bg-gray-100">Register</Link>
          <Link to="/login"
            className="block p-4 text-gray-900 hover:bg-gray-100">Login</Link>
          {/* Add more links as needed */}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
