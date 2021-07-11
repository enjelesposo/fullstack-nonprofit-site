const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "6053715KaKA",
    database: "shellter",
    port: 5432,

})

module.exports = pool;