const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASS,
    database: "shellter",
    port: 5432,

})

module.exports = pool;