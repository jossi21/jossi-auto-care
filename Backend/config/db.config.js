const mysql = require("mysql2/promise");

// Remove SSL certificate loading - use simple connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 25963,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  // Remove SSL - it's causing the error
  // ssl: { rejectUnauthorized: false }  // Optional: add this if needed
});

async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = { query };
