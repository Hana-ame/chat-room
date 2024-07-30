import './App.css';
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './layouts/Main';
import Profile from './pages/Profile';
import About from './pages/About';
import Page404 from './components/Page404';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register'
import PrivateRoute from './routes/PrivateRoute';
import Postman from './Tools/Postman';
import { profileLoader } from './functions/profile_loader';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <BrowserRouter>
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
              element={<Login />} />
            <Route path="/register"
              element={<Register />} />
            <Route path="/profile"
              loader={profileLoader}
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />

            <Route path="*"
              element={<Page404 />} />

            <Route path="/postman"
              element={<Postman></Postman>}></Route>
          </Routes>
        </Main>
      </div>
    </BrowserRouter>
  );
};

export default App;
