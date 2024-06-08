// import React, { useState } from 'react';
// import axios from 'axios';
// import { ReactMediaRecorder } from 'react-media-recorder';

// const SpeakingTest = ({ question, testType }) => {
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [evaluation, setEvaluation] = useState(null);
//   const [audioURL, setAudioURL] = useState('');

//   const handleAudioStop = async (blobUrl, blob) => {
//     setAudioURL(blobUrl);
  
//     const formData = new FormData();
//     formData.append('question', question);
  
//     // Check if any existing encoder for the same mime type exists and remove it
//     for (const pair of formData.entries()) {
//       if (pair[1] instanceof Blob && pair[1].type === blob.type) {
//         formData.delete(pair[0]);
//       }
//     }
  
//     // Append the audio blob to formData
//     formData.append('audio', blob, 'audio.mp3');
  
//     try {
//       const response = await axios.post('http://localhost:3001/api/assess-speech', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setEvaluation(response.data);
//     } catch (error) {
//       console.error('Error assessing speech:', error);
//       alert('Failed to assess speech');
//     }
//   };
  

//   return (
//     <div>
//       <h1>{testType} Speaking Test</h1>
//       <p>{question}</p>
//       <ReactMediaRecorder
//                 audio
//                 onStop={handleAudioStop}
//                 render={({ startRecording, stopRecording, mediaBlobUrl }) => (
//                   <div>
//                     <button onClick={startRecording}>Start Recording</button>
//                     <button onClick={stopRecording}>Stop Recording</button>
//                     <audio src={mediaBlobUrl} controls />
//                   </div>
//                 )}
//               />
//               {evaluation && (
//                 <div>
//                   <h3>Evaluation:</h3>
//                   <p><strong>Pronunciation:</strong> Score {evaluation.pronunciation.score} - {evaluation.pronunciation.feedback}</p>
//                   <p><strong>Fluency and Coherence:</strong> Score {evaluation.fluency_coherence.score} - {evaluation.fluency_coherence.feedback}</p>
//                   <p><strong>Lexical Resource:</strong> Score {evaluation.lexical_resource.score} - {evaluation.lexical_resource.feedback}</p>
//                   <p><strong>Grammatical Range and Accuracy:</strong> Score {evaluation.grammatical_range_accuracy.score} - {evaluation.grammatical_range_accuracy.feedback}</p>
//                   <p><strong>IELTS Score:</strong> {evaluation.ielts_score}</p>
//                   <p><strong>TOEFL Score:</strong> {evaluation.toefl_score}</p>
//                   <p><strong>CEFR Level:</strong> {evaluation.cefr_level}</p>
//                 </div>
//               )}
//             </div>
//   );
// };

// export default SpeakingTest;
import React, { useState } from 'react';
import axios from 'axios';
import { ReactMediaRecorder } from 'react-media-recorder-2';

const SpeakingTest = ({ question, testType }) => {
  const [audioBlob, setAudioBlob] = useState(null);
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

  const handleAudioStop = async (blobUrl, blob) => {
    setAudioURL(blobUrl);

    try {
      const base64Audio = await blobToBase64(blob);
      
      const payload = {
        question: question,
        audio_data: base64Audio,
        sampling_rate: 16000, // or the actual sampling rate of your audio
      };

      const response = await axios.post('http://localhost:3001/api/assess-speech', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setEvaluation(response.data);
    } catch (error) {
      console.error('Error assessing speech:', error);
      alert('Failed to assess speech');
    }
  };

  return (
    <div>
      <h1>{testType} Speaking Test</h1>
      <p>{question}</p>
      <ReactMediaRecorder
        audio={{
          bitsPerSecond: 128000, // Reduce the bitrate to lower the file size
        }}
        onStop={handleAudioStop}
        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <audio src={mediaBlobUrl} controls />
          </div>
        )}
      />
      {evaluation && (
        <div>
          <h3>Evaluation:</h3>
          <p><strong>Pronunciation:</strong> Score {evaluation.pronunciation.score} - {evaluation.pronunciation.feedback}</p>
          <p><strong>Fluency and Coherence:</strong> Score {evaluation.fluency_coherence.score} - {evaluation.fluency_coherence.feedback}</p>
          <p><strong>Lexical Resource:</strong> Score {evaluation.lexical_resource.score} - {evaluation.lexical_resource.feedback}</p>
          <p><strong>Grammatical Range and Accuracy:</strong> Score {evaluation.grammatical_range_accuracy.score} - {evaluation.grammatical_range_accuracy.feedback}</p>
          <p><strong>IELTS Score:</strong> {evaluation.ielts_score}</p>
          <p><strong>TOEFL Score:</strong> {evaluation.toefl_score}</p>
          <p><strong>CEFR Level:</strong> {evaluation.cefr_level}</p>
        </div>
      )}
    </div>
  );
};

export default SpeakingTest;

