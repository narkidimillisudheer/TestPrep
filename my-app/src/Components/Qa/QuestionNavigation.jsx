import React, { useEffect, useState } from 'react';

const QuestionNavigation = ({ totalQuestions, currentQuestion, onNavigate, visited ,viewed,submitted,onSubmit}) => {
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        setCanSubmit(submitted.length === totalQuestions);
    }, [submitted, totalQuestions]);
    return (
        <>
        <style>
            {`
            .navigation-container {
                position: fixed;
                right: 20px;
                top: 80px;
                width: 250px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #ffffff;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                flex-wrap: wrap;
            }
            .navigation-container h4{
                width:1005;
            }
            .navigation-button {
                width: 40px;
                height: 40px;
                margin: 5px;
                border: none;
                border-radius: 50%;
                background-color: #e0e0e0;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .navigation-button:hover {
                background-color: #c0c0c0;
            }

            .navigation-button.visited {
                background-color: lightgreen;
            }

            
                .navigation-button.viewed {
                    background-color: yellow;
                }
                    .navigation-button.active {
                background-color: lightblue;
            }
                .submit-button-container {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin-top: 10px;
                }
                .submit-button {
                    margin-top: 10px;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    background-color: ${canSubmit ? '#4CAF50' : '#e0e0e0'};
                    color: ${canSubmit ? '#fff' : '#aaa'};
                    cursor: ${canSubmit ? 'pointer' : 'not-allowed'};
                    transition: background-color 0.3s;
                    float:middle;
                }

                .submit-button:hover {
                    background-color: ${canSubmit ? '#45a049' : '#e0e0e0'};
                }
            `}
        </style>
        
        <div className="navigation-container">
            {Array.from({ length: totalQuestions }, (_, i) => (
                <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`navigation-button 
                     
                    ${visited.includes(i) ? 'visited' : ''} 
                    ${viewed.includes(i) && !visited.includes(i) ? 'viewed' : ''}
                    ${i === currentQuestion ? 'active' : ''}`}
            >
                    {i + 1}
                </button>
            ))}
            <div className="submit-button-container">
            <button
                    className="submit-button"
                    onClick={onSubmit}
                    disabled={!canSubmit}
                >
                    End Test
                </button>
        </div>
        </div>
        </>
    );
};

export default QuestionNavigation;
