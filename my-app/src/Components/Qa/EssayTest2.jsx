import React, { useState,useEffect} from 'react';
import axios from 'axios';

const EssayTest2 = ({ question, testType, onAnswerResult,onAnswerSubmit }) => {
    const [answer, setAnswer] = useState('');
    const [evaluation, setEvaluation] = useState(null);

    const handleSubmitEssay = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/assess-essay', { question, answer });
            setEvaluation(response.data);
            onAnswerResult(response.data.task_response.score);  // Pass the evaluation data
            onAnswerSubmit();
        } catch (error) {
            console.error('Error assessing essay:', error);
            alert('Failed to assess essay');
            onAnswerSubmit();
        }
    };
    useEffect(() => {
        // Clear the answer and evaluation when the question changes
        setAnswer('');
        setEvaluation(null);
      }, [question]);
    return (
        <>
        <style>
            {`
                /* EssayTest.css */
.container23 {
    padding: 20px;
    font-family: Arial, sans-serif;
    width: 800px;
    margin: 0 auto;
}

.bold {
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 10px;
}

.textareaEssay {
    width: 70%;
    height: 150px;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.textareaEssay:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}

.buttonPrimary {
    width:150px;
    background-color: #002cff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.3s;
}

.buttonPrimary:hover {
    background-color: #0056b3;
}

.buttonPrimary:active {
    transform: scale(0.98);
}
    .evaluation{
                background-color: #ffffff;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
                
.evaluation {
    margin-top: 20px;
}

.evaluation h3 {
    margin-bottom: 10px;
}

.evaluation p {
    margin-bottom: 5px;
}

            `}
        </style>
        <div className="container23">
        <div className="content">
            <h1>{testType} Essay Test</h1>
            <h2>{question}</h2>
            <center>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} className="textareaEssay"/>
            <br/>
            <button onClick={handleSubmitEssay} className="buttonPrimary">Submit</button>
            </center>
        </div>
            {evaluation && (
                <div className="evaluation">
                    <h3>Evaluation:</h3>
                    <p><strong>Task Response:</strong> Score {evaluation.task_response.score} - {evaluation.task_response.feedback}</p>
                </div>
            )}
        </div>
        </>
    );
};

export default EssayTest2;
