// Home.js
import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

const Main = ({ children, isOpen }) => {
  return (
    <main
      className={classNames([
        "flex-1",
        "transition-transform duration-300",
        `${isOpen ? 'mr-64' : ''}`, // Adjust margin when sidebar is open
        "p-4",
        "bg-gray-100"
      ])}
    >
      {children}
    </main>
  );
};

export default Main;
