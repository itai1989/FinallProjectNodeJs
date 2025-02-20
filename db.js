const sql = require('mysql2');
require('dotenv').config();

const pool = sql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = pool.promise();