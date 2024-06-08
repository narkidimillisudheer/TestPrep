import React, { useState } from 'react';
import axios from 'axios';
import EssayTest from './EssayTest';
import SpeakingTest from './SpeakingTest';

const Test = () => {
  const [selectedTestType, setSelectedTestType] = useState(null);
  const [testMode, setTestMode] = useState(null);
  const [question, setQuestion] = useState('');

  const handleCardClick = (mode) => {
    setTestMode(mode);
  };

  const handleTestTypeSelect = async (type) => {
    setSelectedTestType(type);
    // Fetch the question from the backend
    // const response = await axios.post('http://localhost:3001/api/generate-question', { type, mode: testMode });
    // setQuestion(response.data.question);
    setQuestion("tell me about yourself");
  };

  return (
    <div className="App">
      {!testMode ? (
        <div>
          <h1>Select a Test Mode</h1>
          <button onClick={() => handleCardClick('essay')}>Essay Test</button>
          <button onClick={() => handleCardClick('speaking')}>Speaking Test</button>
        </div>
      ) : !selectedTestType ? (
        <div>
          <h1>Select Test Type</h1>
          <button onClick={() => handleTestTypeSelect('GRE')}>GRE</button>
          <button onClick={() => handleTestTypeSelect('IELTS')}>IELTS</button>
          <button onClick={() => handleTestTypeSelect('TOEFL')}>TOEFL</button>
          <button onClick={() => handleTestTypeSelect('SAT')}>SAT</button>
        </div>
      ) : (
        <div>
          {testMode === 'essay' ? (
            <EssayTest question={question} testType={selectedTestType} />
          ) : (
            <SpeakingTest question={question} testType={selectedTestType} />
          )}
        </div>
      )}
    </div>
  );
};

export default Test;
