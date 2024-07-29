import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Transition } from '@headlessui/react'; // For animations
// import { XIcon, MenuIcon } from '@heroicons/react/outline'; // For icons

const Sidebar = ({ isOpen, setIsOpen }) => {
  
  return (
    <>
      <aside className={classNames([
        "fixed inset-0 z-30 flex",
        `${isOpen ? 'block' : 'hidden'}`,
        "lg:block lg:w-64 lg:flex lg:flex-col bg-white shadow-lg lg:right-0 lg:ml-auto",
      ])}>
        {/* Sidebar */}
        <div className="flex flex-col flex-1">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link to="/"
              className="block p-4 text-gray-900 hover:bg-gray-100">Home</Link>
            <Link to="/profile"
              className="block p-4 text-gray-900 hover:bg-gray-100">Profile</Link>
            {/* <Link to="/messages"
              className="block p-4 text-gray-900 hover:bg-gray-100">Messages</Link> */}
            {/* Add more links as needed */}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
