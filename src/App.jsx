import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import About from './components/About';
import Page404 from './components/Page404';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Router>
      <div className='flex h-screen'>

        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Main
          isOpen={isOpen}
        >
          <Routes>
            <Route path="/"
              element={<About />} />
            <Route path="/login"
              element={<LoginPage />} />
            <Route path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />

            <Route path="*"
              element={<Page404 />} />
          </Routes>
        </Main>
      </div>
    </Router>
  );
};

export default App;
