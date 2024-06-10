const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const supertokens =require("supertokens-node") ;
const Session = require("supertokens-node/recipe/session") ;
const ThirdParty =require("supertokens-node/recipe/thirdparty");
const Passwordless =require("supertokens-node/recipe/passwordless"); 
const {middleware} =require("supertokens-node/framework/express") ;
const { verifySession } = require("supertokens-node/recipe/session/framework/express") ;
const { SessionRequest } = require("supertokens-node/framework/express") ;
const axios = require("axios");
const multer = require("multer");
const cohere = require('cohere-ai');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI("AIzaSyDuGJM-eeTKZXKaZ8tmqYt_C6OuSE8ktuc");//sudheer 1
const genAI = new GoogleGenerativeAI("AIzaSyDilYpy8k4C2RwEXjybm8KG4ac4JLz_qCM");
// ...

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// ...
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as necessary
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
supertokens.init({
    framework: "express",
    supertokens: {
        // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
        connectionURI: "https://try.supertokens.com",
        // apiKey: <API_KEY(if configured)>,
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "my-app",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/zauth",
        websiteBasePath: "/auth2"
    },
    recipeList: [
        Passwordless.init({
            flowType: "USER_INPUT_CODE",
            contactMethod: "EMAIL"
        }),
        ThirdParty.init({
            // We have provided you with development keys which you can use for testing.
            // IMPORTANT: Please replace them with your own OAuth keys for production use.
            signInAndUpFeature: {
                providers: [{
                    config: {
                        thirdPartyId: "google",
                        clients: [{
                            clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                            clientSecret: "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"
                        }]
                    }
                }, {
                    config: {
                        thirdPartyId: "github",
                        clients: [{
                            clientId: "467101b197249757c71f",
                            clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"
                        }]
                    }
                },
                ],
            }
        }),
        Session.init() // initializes session features
    ]
});
app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

// IMPORTANT: CORS should be before the below line.
app.use(middleware());

app.get("/check",verifySession(),(req, res) => {
    let userId = req.session.getUserId();
    //....
});

// app.post('/api/generate-question', async (req, res) => {
//     try {
//         const { type, mode } = req.body;
        
//         // Adjust the prompt to ask for 10 questions
//         let prompt = `Generate 10 ${mode} questions for ${type}. Each question should be in 10 words. Also include the test name either it is GRE, TOEFL, or IELTS.also include the question number and write new question in new line.dont give any extra matter.dont write heading start the response from questions`;
//         const result = await model.generateContent(prompt);
//         console.log(prompt);
//         const response = await result.response;
//         const text = await response.text();
//         console.log(text);

//         // Assuming the response text contains the questions separated by new lines
//         const questions = text.split('\n').filter(question => question.trim() !== '');

//         res.send({ questions });
//     } catch (error) {
//         console.error("Error generating questions:", error);
//         res.status(500).send({ error: 'Failed to generate questions' });
//     }
// });

app.post('/api/generate-question', async (req, res) => {
    try {
        const { type, mode } = req.body;

        // Adjust the prompt based on the mode
        let prompt;
        if (mode === 'speaking') {
            prompt = `Generate 10 speaking essays for ${type}. Each essay should be in 30 words. Also include the test name either it is GRE, TOEFL, or IELTS. Also include the essay number and write each new essay in a new line. Don't give any extra matter. Don't write heading, start the response from essays.only give essays dont include any unnecessary things.i want format like typeof test-number-essay`;
        } else {
            prompt = `Generate 10 ${mode} questions for ${type}. Each question should be in 10 words. Also include the test name either it is GRE, TOEFL, or IELTS. Also include the question number and write each new question in a new line. Don't give any extra matter. Don't write heading, start the response from questions.i want format like typeof test-number-question`;
        }

        const result = await model.generateContent(prompt);
        console.log(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);

        // Assuming the response text contains the questions or essays separated by new lines
        const content = text.split('\n').filter(item => item.trim() !== '');

        res.send({ content });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).send({ error: 'Failed to generate content' });
    }
});

  // Endpoint to assess essay
//   app.post('/api/assess-essay', async (req, res) => {
//     try {
//         const { question, answer, testType } = req.body;
//         // Call the Pragya API to assess the essay
//         console.log(question);
//         console.log(answer);
//         const response = await axios.post(
//             'http://pragya-api.enligence.com/assessment/assess_essay/',
//             {
//                 question,
//                 essay:answer
//             },
//             {
//                 headers: {
//                     Authorization: 'Bearer 82ee8440f49b6da4452e626ff55016c7',
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         console.log(response.data);
//         console.log("hii");
//         // res.send(response.data);
//         const {
//             task_response,
//             coherence_and_cohesion,
//             lexical_resource,
//             grammatical_range_and_accuracy,
//             ielts_score,
//             toefl_score,
//             cefr_level
//         } = response.data;

//         // Send the relevant data back to the client
//         res.send({
//             task_response,
//             coherence_and_cohesion,
//             lexical_resource,
//             grammatical_range_and_accuracy,
//             ielts_score,
//             toefl_score,
//             cefr_level
//         });
//     } catch (error) {
//         console.error('Error fetching questions from Pragya API:', error.response ? error.response.data : error.message);
//         console.error("Error assessing essay:", error);
//         res.status(500).send({ error: 'Failed to assess essay' });
//     }
// });

app.post('/api/assess-essay', async (req, res) => {
    try {
        const { question, answer, testType } = req.body;

        // Log the input data
        console.log("Question:", question);
        console.log("Answer:", answer);
        console.log("Test Type:", testType);

        // Make the request to the Pragya API
        const response = await axios.post(
            'https://pragya-api.enligence.com/assessment/assess_essay/',
            {
                question,
                essay: answer
            },
            {
                headers: {
                    Authorization: 'Bearer 82ee8440f49b6da4452e626ff55016c7',
                    'Content-Type': 'application/json'
                }
            }
        );

        // Log the response from the Pragya API
        console.log("Response data:", response.data);

        const {
            task_response,
            coherence_and_cohesion,
            lexical_resource,
            grammatical_range_and_accuracy,
            ielts_score,
            toefl_score,
            cefr_level
        } = response.data;

        // Send the relevant data back to the client
        res.send({
            task_response,
            coherence_and_cohesion,
            lexical_resource,
            grammatical_range_and_accuracy,
            ielts_score,
            toefl_score,
            cefr_level
        });
    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with a status code that falls out of the range of 2xx
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
            res.status(error.response.status).send({ error: error.response.data });
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('Error request data:', error.request);
            res.status(500).send({ error: 'No response received from Pragya API' });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            res.status(500).send({ error: error.message });
        }
        console.error('Error config:', error.config);
    }
});

  const upload = multer({ storage: multer.memoryStorage() }); //for storage 
  // Endpoint to assess speech
//   app.post('/api/assess-speech', upload.single('audio'), async (req, res) => {
//     const { question, testType } = req.body;
//     const audio = req.file;
  
//     const formData = new FormData();
//     formData.append('audio', audio.buffer, audio.originalname);
//     formData.append('question', question);
//     formData.append('testType', testType);
  
//     // Call the Pragya API to assess the speech
//     const response = await axios.post('https://pragya-api.enligence.com/assess-speech', formData, {
//       headers: {
//         Authorization: 'Bearer 82ee8440f49b6da4452e626ff55016c7',
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     res.send({ evaluation: response.data });
//   });
// app.post('/api/assess-speech', upload.single('audio'), async (req, res) => {
//     try {
//         const { question } = req.body;
//         const audio = req.file;
//         console.log(question);
//         console.log("check2");
//         const formData = new FormData();
//         formData.append('question', question);
//         formData.append('audio', audio.buffer, audio.originalname);

//         const response = await axios.post(
//             'https://pragya-api.enligence.com/assessment/assess_speech/', // Replace with the actual Pragya API endpoint
//             formData,
//             {
//                 headers: {
//                     Authorization: 'Bearer 82ee8440f49b6da4452e626ff55016c7',
//                     'Content-Type': 'multipart/form-data'
//                 }
//             }
//         );
//         res.send(response.data);
//     } catch (error) {
//         console.error('Error assessing speech:', error);
//         res.status(500).send({ error: 'Failed to assess speech' });
//     }
// });
app.post('/api/assess-speech', async (req, res) => {
    try {
        const { question, audio_data, sampling_rate } = req.body;

        if (!audio_data) {
            return res.status(400).send({ error: 'No audio data provided' });
        }
        console.log(question);
        const response = await axios.post(
            'https://pragya-api.enligence.com/assessment/assess_speech/', // Replace with the actual Pragya API endpoint
            {
                text: question,
                base64_audio: audio_data,
                sampling_rate: sampling_rate,
                
            },
            {
                headers: {
                    Authorization: 'Bearer 82ee8440f49b6da4452e626ff55016c7',
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error('Error assessing speech:', error);
        res.status(500).send({ error: 'Failed to assess speech' });
    }
});

app.listen(3001,()=>{
    console.log("app is running");
})