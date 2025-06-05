const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
    host: process.env.host,
    user: process.env.user,
    password: String(process.env.password),
    database: process.env.database,
    port: process.env.port
    });

module.exports = pool;