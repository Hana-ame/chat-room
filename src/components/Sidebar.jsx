// Sidebar.jsx @ 240801

import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Transition } from '@headlessui/react'; // For animations
// import { XIcon, MenuIcon } from '@heroicons/react/outline'; // For icons
const Sidebar = ({ className, setIsOpen }) => {
  
  const linkClass = "block p-4 text-gray-900 hover:bg-gray-100";

  return (
    <aside className={className}>
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
          <Link to="/register" className={linkClass} onClick={() => setIsOpen(false)}>Register(不会正式出现)</Link>
          <Link to="/login" className={linkClass} onClick={() => setIsOpen(false)}>Login(不会正式出现)</Link>
        </nav>
      </div>
    </aside>
  );
};


export default Sidebar;
