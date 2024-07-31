import { useState } from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-md p-4 flex justify-between items-center lg:hidden">
        <h1 className="text-xl font-bold">Your App Name</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700">
          {isOpen ? 'close menu' : 'open menu'}
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 bg-gray-100">
          <Outlet />
        </main>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Layout;