// config/db.config.js
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

// Load SSL certificate for production
let sslConfig = {};
if (process.env.NODE_ENV === "production") {
  try {
    const caCert = fs.readFileSync(path.join(__dirname, "../certs/ca.pem"));
    sslConfig = { ssl: { ca: caCert } };
  } catch (error) {
    console.error("Failed to load SSL certificate:", error.message);
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 25963,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  ...sslConfig,
});

async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = { query };
