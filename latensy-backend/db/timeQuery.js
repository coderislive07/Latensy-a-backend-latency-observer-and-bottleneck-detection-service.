// What timedQuery does
// 1.Measures one DB operation
// 2.Knows about DB implementation
// 3.Is called only when DB is used


// pool-runs the query only 
// this function will run the query in the pool find the endtime and return the time taken along with the result of the query to the user service

const pool = require('./pool');
async function timeQuery(query , params=[])
{
    const start = process.hrtime();
    const result = await pool.query(query , params);
    const end = process.hrtime(start);
    const timeTaken = Number(end[0]*1e3 + end[1]/1e6).toFixed(2); // converting to milliseconds
    return {
        rows: result.rows,
        timeTaken: timeTaken
    }
}
module.exports = timeQuery;

