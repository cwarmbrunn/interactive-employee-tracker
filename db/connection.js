// Require MySQL
const mysql = require("mysql2");

// Set up dotenv (PASSWORD)
require("dotenv").config();

// Connect to Database
const db = mysql.createConnection({
  host: "localhost",
  // MySQL Username
  user: "root",
  // MySQL Password
  password: process.env.DB_PW,
  // Connect to Database
  database: "company",
});

module.exports = db;
