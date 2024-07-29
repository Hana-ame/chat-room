import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Sidebar from './components/Sidebar';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Router>
      <div className='flex h-screen'>
        
        <Sidebar 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <Routes>
          <Route path="/"
            element={<Home
              isOpen={isOpen}
            />} />
          <Route path="/about"
            element={<About />} />
          <Route path="*"
            element={<NotFound />} />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
