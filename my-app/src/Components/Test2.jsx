import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Tips, Tip, ReviewButton } from './styles';
import styled from 'styled-components';
import QaDisplay2 from './Qa/QaDisplay2';
import NavigationUpdated from './NavigationUpdated';
import Footer from './Qa/Footer';
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #f9f9f9;
  height: 50vh;
`;

const AppContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const ExamCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ExamCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  h2 {
    margin-top: 0;
    font-size: 1.5em;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul li {
    margin: 5px 0;
  }

  .btn {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const CardHeaderContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    height: 40px;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RightArrowButton = styled.button`
  margin-top: 0;
  background: none;
  border: none;
  color: #007bff;
  font-size: 1.9em;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const Test2 = () => {
  const [selectedTestType, setSelectedTestType] = useState(null);
  const [testMode, setTestMode] = useState(null);

  const handleCardClick = async (mode) => {
    setTestMode(mode);
  };

  const handleTestTypeSelect = async (type) => {
    setSelectedTestType(type);
  };

  const exams = [
    {
      title: 'GRE',
      icon: 'fa-book',
      description: 'Graduate Record Examination',
      details: [
        { label: 'Duration', value: '3 hours 45 minutes' },
        { label: 'Sections', value: 'Verbal Reasoning, Quantitative Reasoning, Analytical Writing' },
        { label: 'Score Range', value: '130-170 per section' },
      ],
      link: '#',
    },
    {
      title: 'IELTS',
      icon: 'fa-language',
      description: 'International English Language Testing System',
      details: [
        { label: 'Duration', value: '2 hours 45 minutes' },
        { label: 'Sections', value: 'Listening, Reading, Writing, Speaking' },
        { label: 'Score Range', value: '0-9 bands' },
      ],
      link: '#',
    },
    {
      title: 'TOEFL',
      icon: 'fa-globe',
      description: 'Test of English as a Foreign Language',
      details: [
        { label: 'Duration', value: '4 hours' },
        { label: 'Sections', value: 'Reading, Listening, Speaking, Writing' },
        { label: 'Score Range', value: '0-120' },
      ],
      link: '#',
    },
    {
      title: 'SAT',
      icon: 'fa-graduation-cap',
      description: 'Scholastic Assessment Test',
      details: [
        { label: 'Duration', value: '3 hours (plus 50 minutes for the optional Essay)' },
        { label: 'Sections', value: 'Reading, Writing and Language, Math, Essay (optional)' },
        { label: 'Score Range', value: '400-1600' },
      ],
    },
  ];

  return (
    <>
    <NavigationUpdated/>
    <AppContainer>
      {!selectedTestType ? (
        <div>
        <h1>Select Test Type</h1>
        <ExamCards>
          {exams.map((exam, index) => (
            <ExamCard key={index}>
              <CardHeaderContainer>
                <h2>
                  <i className={`fas ${exam.icon}`} style={{ marginRight: '10px' }}></i>
                  {exam.title}
                </h2>
                <RightArrowButton onClick={() => handleTestTypeSelect(exam.title)}>
                  →
                </RightArrowButton>
              </CardHeaderContainer>
              <p>{exam.description}</p>
              <ul>
                {exam.details.map((detail, idx) => (
                  <li key={idx}><strong>{detail.label}:</strong> {detail.value}</li>
                ))}
              </ul>
            </ExamCard>
          ))}
        </ExamCards>
      </div>
      ) : !testMode ? (
        <div>
          <h1>Select a Test Mode</h1>
          <Container>
            <Card onClick={() => handleCardClick('essay')}>
              <CardHeader>
                <div role="img" aria-label="writing" style={{ fontSize: '24px' }}>✍️</div>
                <h3>Writing</h3>
              </CardHeader>
              <CardBody>
                <Tips>
                  <Tip>1. Think clearly before you start writing.</Tip>
                  <Tip>2. Use clear and concise language.</Tip>
                  <Tip>3. Support your arguments with evidence.</Tip>
                  <Tip>4. Proofread your work for spelling and grammar errors.</Tip>
                </Tips>
                <ReviewButton>Essay Test</ReviewButton>
              </CardBody>
            </Card>
            <Card onClick={() => handleCardClick('speaking')}>
              <CardHeader>
                <div role="img" aria-label="speaking" style={{ fontSize: '24px' }}>🗣️</div>
                <h3>Speaking</h3>
              </CardHeader>
              <CardBody>
                <Tips>
                  <Tip>1. Practice speaking clearly and confidently.</Tip>
                  <Tip>2. Use a wide range of vocabulary.</Tip>
                  <Tip>3. Organize your thoughts before you speak.</Tip>
                  <Tip>4. Engage your audience with eye contact and gestures.</Tip>
                </Tips>
                <ReviewButton>Speaking Test</ReviewButton>
              </CardBody>
            </Card>
          </Container>
        </div>
        
      ) : (
        <div>
          {testMode === 'essay' ? (
            <QaDisplay2 type={selectedTestType} mode={testMode} />
          ) : (
            <QaDisplay2 type={selectedTestType} mode={testMode} />
          )}
        </div>
      )}
    
    <Footer/>
    </AppContainer>
    </>
  );
};

export default Test2;
