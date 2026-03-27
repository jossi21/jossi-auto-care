// import mysql ;
const mysql = require("mysql2/promise");

// define connection parameter
const dbConfig = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
};

// create connection pull
const pool = mysql.createPool(dbConfig);

// creating the function execute the SQL queries asynchronously
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

// export the function
module.exports = { query };
