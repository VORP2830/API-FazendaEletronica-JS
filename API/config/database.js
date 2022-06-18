require('dotenv').config()
const mysql = require("mysql2");

const database = mysql.createPool(process.env.DATABASE_URL);

module.exports = database;