require('dotenv').config();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models`;

console.log('Listing available models...');
console.log('Endpoint:', ENDPOINT);

axios.get(
    `${ENDPOINT}?key=${GEMINI_API_KEY}`,
    {
        timeout: 10000
    }
).then(response => {
    console.log('✅ Models found:');
    const models = response.data.models || [];
    models.forEach(model => {
        console.log(`  - ${model.name}`);
        if (model.supportedGenerationMethods) {
            console.log(`    Methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
    });
}).catch(error => {
    console.log('❌ Error:', error.response?.status || error.code);
    console.log('Message:', error.response?.data?.error?.message || error.message);
    if (error.response?.data) {
        console.log('Response:', JSON.stringify(error.response.data, null, 2));
    }
});
