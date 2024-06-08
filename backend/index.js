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
const genAI = new GoogleGenerativeAI("AIzaSyDuGJM-eeTKZXKaZ8tmqYt_C6OuSE8ktuc");

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
//         // // Call the Cohere API to generate a question
//         // const response = await cohere.generate({
//         //     prompt: `Generate a ${mode} question for ${type} in 10 words.`,
//         //     maxTokens: 10, // Adjust the max tokens based on your requirement
//         //     api_key:'wOj78Z7gPKlUPNQTEKSF1QmfD0Xw9A17MjjuSpB3',
//         // });
//         // console.log("Question generated:", response.body.generations[0].text);
//         // res.send({ question: response.body.generations[0].text });
//         let prompt=`Generate a ${mode} question for ${type} in 10 words.also include the test name either it is gre,tofel,ielts`;
//         const result = await model.generateContent(prompt);
//         console.log(prompt);
//         const response = await result.response;
//          const text = response.text();
//         console.log(text);
//          res.send({ question: text });
//     } catch (error) {
//         console.error("Error generating question:", error);
//         res.status(500).send({ error: 'Failed to generate question' });
//     }
// });
  
  // Endpoint to assess essay
  app.post('/api/assess-essay', async (req, res) => {
    try {
        const { question, answer, testType } = req.body;
        // Call the Pragya API to assess the essay
        console.log(question);
        console.log(answer);
        const response = await axios.post(
            'https://pragya-api.enligence.com/assessment/assess_essay/',
            {
                question,
                essay:answer
            },
            {
                headers: {
                    Authorization: 'Bearer 82ee8440f49b6da4452e626ff55016c7',
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.data);
        // res.send(response.data);
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
        console.error("Error assessing essay:", error);
        res.status(500).send({ error: 'Failed to assess essay' });
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
app.post('/api/assess-speech', upload.single('audio'), async (req, res) => {
    try {
        const { question } = req.body;
        const audio = req.file;
        console.log(question);
        console.log(check2);
        const formData = new FormData();
        formData.append('question', question);
        formData.append('audio', audio.buffer, audio.originalname);

        const response = await axios.post(
            'https://pragya-api.enligence.com/assessment/assess_speech/', // Replace with the actual Pragya API endpoint
            formData,
            {
                headers: {
                    Authorization: 'Bearer 82ee8440f49b6da4452e626ff55016c7',
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        res.send(response.data);
    } catch (error) {
        console.error('Error assessing speech:', error);
        res.status(500).send({ error: 'Failed to assess speech' });
    }
});
  

app.listen(3001,()=>{
    console.log("app is running");
})