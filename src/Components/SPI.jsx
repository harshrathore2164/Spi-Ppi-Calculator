// src/components/SPI.jsx
import React, { useState } from 'react';
import './SPI.css'; // Import CSS for styling

const SPI = () => {
  const [numSubjects, setNumSubjects] = useState(0);
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [spiValue, setSPIValue] = useState(null);

  // Define grade options
  const gradeOptions = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'IF'];

  // Handle change in number of subjects input
  const handleNumSubjectsChange = (e) => {
    const num = parseInt(e.target.value);
    setNumSubjects(num >= 0 ? num : 0); // Ensure no negative subjects
    setSubjectDetails(Array.from({ length: num }, (_, index) => ({
      serial: index + 1,
      grade: '',
      credits: ''
    })));
    setSPIValue(null); // Reset SPI value when subjects change
  };

  // Handle change in grade input for a subject
  const handleGradeChange = (index, value) => {
    const updatedSubjects = [...subjectDetails];
    updatedSubjects[index].grade = value;
    setSubjectDetails(updatedSubjects);
  };

  // Handle change in credits input for a subject
  const handleCreditsChange = (index, value) => {
    const updatedSubjects = [...subjectDetails];
    updatedSubjects[index].credits = value >= 0 ? value : ''; // Ensure no negative credits
    setSubjectDetails(updatedSubjects);
  };

  // Handle SPI calculation
  const calculateSPI = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    subjectDetails.forEach(subject => {
      const credits = parseInt(subject.credits);
      const grade = subject.grade;

      if (!isNaN(credits) && credits > 0 && grade !== '') {
        totalCredits += credits;
        switch (grade) {
          case 'A+':
            totalGradePoints += 10 * credits;
            break;
          case 'A':
            totalGradePoints += 9 * credits;
            break;
          case 'B+':
            totalGradePoints += 8 * credits;
            break;
          case 'B':
            totalGradePoints += 7 * credits;
            break;
          case 'C+':
            totalGradePoints += 6 * credits;
            break;
          case 'C':
            totalGradePoints += 5 * credits;
            break;
          case 'IF':
            // If Incomplete Fail, no grade points are added
            break;
          default:
            break;
        }
      }
    });

    // Calculate SPI
    if (totalCredits > 0) {
      const spi = totalGradePoints / totalCredits;
      setSPIValue(spi.toFixed(2)); // Round SPI to 2 decimal places
    } else {
      setSPIValue('NaN');
    }
  };

  return (
    <div className="spi-container">
      <h2>SPI Calculator</h2>
      <label htmlFor="numSubjects">Number of Subjects:</label>
      <input
        type="number"
        id="numSubjects"
        value={numSubjects}
        onChange={handleNumSubjectsChange}
      />
      {numSubjects > 0 && (
        <div className="subjects-container">
          {subjectDetails.map((subject, index) => (
            <div key={index} className="subject-inputs">
              <span>{subject.serial}</span>
              <select
                value={subject.grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
              >
                <option value="">Select Grade</option>
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder={`Credits`}
                value={subject.credits}
                onChange={(e) => handleCreditsChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
      {numSubjects === 0 && (
        <p>Please enter a valid number of subjects.</p>
      )}
      <button className="calculate-button" onClick={calculateSPI}>Calculate SPI</button>
      {spiValue !== null && (
        <div className="spi-result">
          <p>Semester Performance Index (SPI): <strong>{spiValue}</strong></p>
        </div>
      )}
    </div>
  );
};

export default SPI;
