import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Transition } from '@headlessui/react'; // For animations
// import { XIcon, MenuIcon } from '@heroicons/react/outline'; // For icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className={`fixed inset-0 z-30 flex ${isOpen ? 'block' : 'hidden'} lg:block lg:w-64 lg:flex lg:flex-col bg-white shadow-lg`}>
        <button className="lg:hidden p-4" onClick={() => setIsOpen(false)}>
          {/* <XIcon className="h-6 w-6 text-gray-500" /> */}
        </button>
        <div className="flex flex-col flex-1">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link path="/home" className="block p-4 text-gray-900 hover:bg-gray-100">Home</Link>
            <Link path="/profile" className="block p-4 text-gray-900 hover:bg-gray-100">Profile</Link>
            <Link path="/messages" className="block p-4 text-gray-900 hover:bg-gray-100">Messages</Link>
            {/* Add more links as needed */}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
