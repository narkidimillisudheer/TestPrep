
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { ReactMediaRecorder } from 'react-media-recorder-2';

const SpeakingTest = ({ question, testType,onAnswerResult,onAnswerSubmit }) => {
  const [evaluation, setEvaluation] = useState(null);
  const [audioURL, setAudioURL] = useState('');

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]); // Extract base64 part from Data URL
      };
      reader.onerror = reject;
    });
  };
  useEffect(() => {
    // Clear the answer and evaluation when the question changes
    setAudioURL('');
    setEvaluation(null);
  }, [question]);
  const handleAudioStop = async (blobUrl, blob) => {
    setAudioURL(blobUrl);

    try {
      const base64Audio = await blobToBase64(blob);
      
      const payload = {
        question: question,
        gender:'male',
        audio_data: base64Audio,
        sampling_rate: 16000, // or the actual sampling rate of your audio
        
      };

      const response = await axios.post('http://localhost:3001/api/assess-speech', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setEvaluation(response.data);
      onAnswerResult(response.data.pronunciation.stats.correctness);
      onAnswerSubmit();
    } catch (error) {
      console.error('Error assessing speech:', error);
      alert('Failed to assess speech please try again ');
    }
  };

  return (
    <>
    <style>
      {`
        .buttonPrimary {
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
    .buttonStop {
    background-color: #EC1818;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.3s;
}   
    .MatterToSpeak{
        width:500px;
        word-wrap: break-word;
        
    }
        .container {
        padding: 20px;
    font-family: Arial, sans-serif;
    width: 800px;
    margin: 0 auto;
      }
      .evaluation{
      margin-top:20px;
                background-color: #ffffff;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      
      `}
    </style>
    <div className="container">
    <div className="content">
      <h1>{testType} Speaking Test</h1>
      <h3>Read the following essay after clicking start recording</h3>
      <center><p className="MatterToSpeak">{question}</p></center>
      
      <ReactMediaRecorder
        audio={{
          bitsPerSecond: 128000, // Reduce the bitrate to lower the file size
        }}
        onStop={handleAudioStop}
        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <audio src={mediaBlobUrl} controls />
            <br/>
            <br />
            <button onClick={startRecording} className="buttonPrimary">Start Recording</button>
            &emsp;
            <button onClick={stopRecording} className="buttonStop">Stop Recording</button>
            
          </div>
        )}
      />
      </div>
      {evaluation && (
        <div className="evaluation">
          <h3>Evaluation:</h3>
          <p><strong>Pronunciation:</strong> Score {evaluation.score} - {evaluation.feedback}</p>
          <p><strong>Fluency and Coherence:</strong> Score {evaluation.spoken_text} - {evaluation.pronunciation.stats.correctness}</p>
          <p><strong>Lexical Resource:</strong> Score {evaluation.fluency.score} - {evaluation.fluency.feedback}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default SpeakingTest;

