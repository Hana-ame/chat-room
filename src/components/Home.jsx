// Home.js
import React from 'react';
import classNames from 'classnames';

const Home = ({ isOpen }) => {
  return (
    <main
      className={classNames([
        "flex-1",
        "transition-transform duration-300",
        `${isOpen ? 'mr-64' : ''}`, // Adjust margin when sidebar is open
        "p-4",
      ])}
      style={{background:"gray"}}
    >
      <h1>Home PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome Page</h1>
      <h1>Home PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome Page</h1>
      <h1>Home PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome Page</h1>
      <h1>Home PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome Page</h1>
      <h1>Home PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome Page</h1>
      <h1>Home PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome PageHome Page</h1>
      <h1>Home Page</h1>
    </main>
  );
};

export default Home;
