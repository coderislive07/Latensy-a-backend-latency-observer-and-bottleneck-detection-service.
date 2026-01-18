 async function timedHttp(httpClient, options) {

    const start = process.hrtime();
    const response = await httpClient(options);
    const end = process.hrtime(start);
    const timeTaken = Number(end[0] * 1e3 + end[1] / 1e6).toFixed(2); // converting to milliseconds
    return {
        response: response,
        timeTaken: timeTaken
    };
}

module.exports = timedHttp; 
