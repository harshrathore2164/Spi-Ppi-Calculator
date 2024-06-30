// src/components/PPI.jsx
import React, { useState } from 'react';
import './PPI.css'; // Import CSS for styling

const PPI = () => {
  const [numSemesters, setNumSemesters] = useState(0);
  const [semesterDetails, setSemesterDetails] = useState([]);
  const [ppiValue, setPPIValue] = useState(null);

  // Handle change in number of semesters input
  const handleNumSemestersChange = (e) => {
    const num = parseInt(e.target.value);
    setNumSemesters(num >= 0 ? num : 0); // Ensure no negative semesters
    setSemesterDetails(Array.from({ length: num }, (_, index) => ({
      serial: index + 1,
      spi: '',
      totalCredits: ''
    })));
    setPPIValue(null); // Reset PPI value when semesters change
  };

  // Handle change in SPI input for a semester
  const handleSPIChange = (index, value) => {
    const updatedSemesters = [...semesterDetails];
    updatedSemesters[index].spi = value;
    setSemesterDetails(updatedSemesters);
  };

  // Handle change in total credits input for a semester
  const handleTotalCreditsChange = (index, value) => {
    const updatedSemesters = [...semesterDetails];
    updatedSemesters[index].totalCredits = value >= 0 ? value : ''; // Ensure no negative total credits
    setSemesterDetails(updatedSemesters);
  };

  // Handle PPI calculation
  const calculatePPI = () => {
    let totalWeightedSPI = 0;
    let totalCredits = 0;

    semesterDetails.forEach(semester => {
      const spi = parseFloat(semester.spi);
      const credits = parseInt(semester.totalCredits);

      if (!isNaN(spi) && !isNaN(credits) && credits > 0) {
        totalWeightedSPI += spi * credits;
        totalCredits += credits;
      }
    });

    // Calculate PPI
    if (totalCredits > 0) {
      const ppi = totalWeightedSPI / totalCredits;
      setPPIValue(ppi.toFixed(2)); // Round PPI to 2 decimal places
    } else {
      setPPIValue('NaN');
    }
  };

  return (
    <div className="ppi-container">
      <h2>PPI Calculator</h2>
      <label htmlFor="numSemesters">Number of Semesters:</label>
      <input
        type="number"
        id="numSemesters"
        value={numSemesters}
        onChange={handleNumSemestersChange}
      />
      {numSemesters > 0 && (
        <div className="semesters-container">
          {semesterDetails.map((semester, index) => (
            <div key={index} className="semester-inputs">
              <span>{semester.serial}</span>
              <input
                type="number"
                placeholder={`SPI`}
                value={semester.spi}
                onChange={(e) => handleSPIChange(index, e.target.value)}
              />
              <input
                type="number"
                placeholder={`Total Credits`}
                value={semester.totalCredits}
                onChange={(e) => handleTotalCreditsChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
      {numSemesters === 0 && (
        <p>Please enter a valid number of semesters.</p>
      )}
      <button className="calculate-button" onClick={calculatePPI}>Calculate PPI</button>
      {ppiValue !== null && (
        <div className="ppi-result">
          <p>Program Performance Index (PPI): <strong>{ppiValue}</strong></p>
        </div>
      )}
    </div>
  );
};

export default PPI;
