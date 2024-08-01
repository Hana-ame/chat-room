import { useState } from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen max-w-full">
      {/* lg:hidden */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center lg:hidden">
        <h1 className="text-xl font-bold">Your App Name</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700">
          {isOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </header>

      <div className="flex flex-1">
        {/* 为什么加了w-64就好了 @240801 */}
        <main className="flex-1 flex-wrap p-4 bg-gray-100 max-w-full w-64">
          <Outlet />
        </main>
        <Sidebar className={`
            fixed inset-y-0 right-0 z-30 min-w-64 
            bg-white shadow-lg 
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            lg:relative lg:translate-x-0
          `}
          isOpen={isOpen} setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default Layout;