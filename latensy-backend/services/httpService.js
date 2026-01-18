const timedHttp = require('../utils/timedHttp');
const axios = require('axios');

async function fetchTestEndpoint(reqContext) {
    const options = {
        method: 'GET',
        url: 'http://localhost:3000/test'
    };

    const { response, timeTaken } = await timedHttp(axios, options);
    
    // Log the HTTP request time to the request context for latency tracking
    reqContext.httpTimeMs += timeTaken;

    return response.data;
}

module.exports = {
    fetchTestEndpoint
};