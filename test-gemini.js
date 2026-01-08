const axios = require('axios');

const GEMINI_API_KEY = 'AIzaSyA994U2_mvKihCmlOksXSsooQwfLfug_vs';
const GEMINI_MODEL = 'gemini-2.5-pro';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

console.log('Testing Gemini API...');
console.log('Endpoint:', ENDPOINT);
console.log('Key:', GEMINI_API_KEY.substring(0, 10) + '...');

axios.post(
    `${ENDPOINT}?key=${GEMINI_API_KEY}`,
    {
        contents: [
            {
                parts: [
                    {
                        text: 'Hello, respond with just "OK"'
                    }
                ]
            }
        ]
    },
    {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 10000
    }
).then(response => {
    console.log('✅ API Works! Status:', response.status);
    console.log('Response:', response.data.candidates?.[0]?.content?.parts?.[0]?.text);
}).catch(error => {
    console.log('❌ Error:', error.response?.status || error.code);
    console.log('Message:', error.response?.data?.error?.message || error.message);
    if (error.response?.data?.error?.details) {
        console.log('Details:', error.response.data.error.details);
    }
});
