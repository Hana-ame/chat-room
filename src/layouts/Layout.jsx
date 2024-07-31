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
        <main className="flex-1 p-4 bg-gray-100 max-w-full">
          <Outlet />
        </main>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Layout;