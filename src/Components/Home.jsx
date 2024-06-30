// src/components/Home.jsx
import React, { useState } from 'react';
import SPI from './SPI';
import PPI from './PPI';
import './Home.css'; // Import CSS for styling

const Home = () => {
  const [calculationType, setCalculationType] = useState('');

  return (
    <div className="home-container">
      <div className="calculator-box">
        <h2>SPI - PPI Calculator</h2>
        <div className="button-container">
          <button onClick={() => setCalculationType('SPI')}>Calculate SPI</button>
          <button onClick={() => setCalculationType('PPI')}>Calculate PPI</button>
        </div>
        <div className="calculation-content">
          {calculationType === 'SPI' && <SPI />}
          {calculationType === 'PPI' && <PPI />}
        </div>
      </div>
    </div>
  );
};

export default Home;
