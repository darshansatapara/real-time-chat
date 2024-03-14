require('dotenv').config();
const mysql = require("mysql");
const password = process.env.PASSWORD;

const db = mysql.createConnection({   
  host: "localhost",
  user: "root",
  password: password,
  database: "logindata",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = db;
