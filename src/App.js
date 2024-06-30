// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SPI from './Components/SPI';
import PPI from './Components/PPI';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/spi" element={<SPI />} />
          <Route path="/ppi" element={<PPI />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
