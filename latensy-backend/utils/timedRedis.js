async function timedRedis(redisClient, command, ...args) {
    const start = process.hrtime();
    const result = await redisClient[command](...args);
    const end = process.hrtime(start);
    const timeTaken = Number(end[0] * 1e3 + end[1] / 1e6).toFixed(2); // converting to milliseconds
    return {
        result: result,
        timeTaken: timeTaken
    };
}

module.exports = timedRedis;


// Example:

// const args = ["user:123"];
// redisClient["get"](...args); 
// // same as redisClient.get("user:123")


// This makes your function generic — it works with any Redis command and any number of arguments.