import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EssayTest2 from './EssayTest2';
import QuestionNavigation from './QuestionNavigation';
import SpeakingTest from './SpeakingTest';
const QaDisplay2 = ({type,mode}) => {
    const [questions,setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState([]);
    const [visited, setVisited] = useState([]);
    const [viewed, setViewed] = useState([]);
    const [submitted, setSubmitted] = useState([]);
    const [testCompleted, setTestCompleted] = useState(false);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.post('http://localhost:3001/api/generate-question', { type, mode});
                setQuestions(response.data.content);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerResult = (index, evaluation) => {
        const newScores = [...scores];
        newScores[index] = evaluation;
        setScores(newScores);
        sessionStorage.setItem('scores', JSON.stringify(newScores));
    };

    const handleAnswerSubmit = () => {
        setVisited((prevVisited) => {
            if (!prevVisited.includes(currentQuestion)) {
                return [...prevVisited, currentQuestion];
            }
            return prevVisited;
        });

        setViewed((prevViewed) => prevViewed.filter((q) => q !== currentQuestion));
        setSubmitted((prevSubmitted) => {
            if (!prevSubmitted.includes(currentQuestion)) {
                return [...prevSubmitted, currentQuestion];
            }
            return prevSubmitted;
        });
        // if (currentQuestion < questions.length - 1) {
        //     setCurrentQuestion(currentQuestion + 1);
        // } else {
        //     alert('You have completed the test!');
        // }
    };
    const handleTestSubmit = () => {
        setTestCompleted(true);
    };
    useEffect(() => {
        setViewed((prevViewed) => {
            if (!prevViewed.includes(currentQuestion) && !visited.includes(currentQuestion)) {
                return [...prevViewed, currentQuestion];
            }
            return prevViewed;
        });
    }, [currentQuestion, visited]);
    const handleHome=()=>{
        window.location.reload();
    }
    const renderEvaluationResults = () => {
        const storedScores = JSON.parse(sessionStorage.getItem('scores')) || scores;
        return (
            <>
            <style>
                {`
                    .navigation-button {
                width: 40px;
                height: 40px;
                margin: 5px;
                border: none;
                border-radius: 50%;
                background-color:rgb(58, 235, 52);
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .navigation-button:hover {
                background-color: rgb(54, 232, 48);
            }                
                `}
            </style>
            <div>
                <h2>Final Scores</h2>
                {storedScores.map((score, index) => (
                    <p key={index}>Question {index + 1}: Score {score}</p>
                ))}
                <button onClick={handleHome} className='navigation-button'>Go to Home</button>
            </div>
            </>
        );
    };

    return (
        <div>
            {questions.length > 0 ? (
                <div>
                    <QuestionNavigation
                        totalQuestions={questions.length}
                        currentQuestion={currentQuestion}
                        onNavigate={setCurrentQuestion}
                        visited={visited}
                        viewed={viewed}
                        submitted={submitted}
                        onSubmit={handleTestSubmit}
                    />
                    {testCompleted ? (
                        renderEvaluationResults()
                    ) : (
                        currentQuestion < questions.length ? (
                            mode === 'essay' ? (
                                <EssayTest2
                                    question={questions[currentQuestion]}
                                    testType={type}
                                    onAnswerResult={(evaluation) => handleAnswerResult(currentQuestion, evaluation)}
                                    onAnswerSubmit={handleAnswerSubmit}
                                />
                            ) : (
                                <SpeakingTest
                                    question={questions[currentQuestion]}
                                    testType={type}
                                    onAnswerSubmit={handleAnswerSubmit}
                                    onAnswerResult={(evaluation) => handleAnswerResult(currentQuestion, evaluation)}
                                />
                            )
                        ) : (
                            renderEvaluationResults()
                            
                        )
                    )}
                </div>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default QaDisplay2;
