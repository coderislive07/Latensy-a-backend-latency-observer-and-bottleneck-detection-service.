// postgres connection pool setup

// what it does basically is it creates a pool of connections to the postgres database using the pg library

const {Pool} = require('pg');

const pool = new Pool(
    {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'latensydb',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,   
    }
)
module.exports = pool;

// 📌 Pool = connection reuse → prevents DB bottlenecks.


