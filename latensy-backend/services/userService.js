const timedQuery = require('../db/timeQuery');


async function getUserById(userId , reqContext) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows, timeTaken } = await timedQuery(query, [userId]);
    // Log the DB query time to the request context for latency tracking

    // accumulated dmTimeMs because real apis do not make one db call per request
    reqContext.dbTimeMs+=timeTaken;
    return rows[0];
}

module.exports = {
    getUserById
};