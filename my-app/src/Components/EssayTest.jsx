import React, { useState } from 'react';
import axios from 'axios';

const EssayTest = ({ question, testType }) => {
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);

  const handleSubmitEssay = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/assess-essay', { question, answer });
      setEvaluation(response.data);
    } catch (error) {
      console.error('Error assessing essay:', error);
      alert('Failed to assess essay');
    }
  };

  return (
    <div>
      <h1>{testType} Essay Test</h1>
      <p>{question}</p>
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={handleSubmitEssay}>Submit</button>
      {evaluation && (
                <div>
                  <h3>Evaluation:</h3>
                  <p><strong>Task Response:</strong> Score {evaluation.task_response.score} - {evaluation.task_response.feedback}</p>
                  <p><strong>Coherence and Cohesion:</strong> Score {evaluation.coherence_and_cohesion.score} - {evaluation.coherence_and_cohesion.feedback}</p>
                  <p><strong>Lexical Resource:</strong> Score {evaluation.lexical_resource.score} - {evaluation.lexical_resource.feedback}</p>
                  <p><strong>Grammatical Range and Accuracy:</strong> Score {evaluation.grammatical_range_and_accuracy.score} - {evaluation.grammatical_range_and_accuracy.feedback}</p>
                  <p><strong>IELTS Score:</strong> {evaluation.ielts_score}</p>
                  <p><strong>TOEFL Score:</strong> {evaluation.toefl_score}</p>
                  <p><strong>CEFR Level:</strong> {evaluation.cefr_level}</p>
                </div>
              )}
    </div>
  );
};

export default EssayTest;
