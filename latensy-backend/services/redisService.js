const timedRedis = require('../utils/timedRedis');

async function getValueByKey(redisClient, key, reqContext) {
    const { result, timeTaken } = await timedRedis(redisClient, 'get', key);
    
    // Log the Redis query time to the request context for latency tracking
    reqContext.redisTimeMs += timeTaken;

    return result;
}

module.exports = {
    getValueByKey
};