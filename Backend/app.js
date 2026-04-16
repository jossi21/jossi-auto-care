//  import express
const express = require("express");
// import .env
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
// import the router to use in the app
const router = require("./routes");
// import cors module
const cors = require("cors");
// import database
const db = require("./config/db.config");

// import the variable that hold our server port
const port = process.env.PORT;

// define cors options
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  optionSuccessStatus: 200,
};

// create web server
const app = express();

// Body parser
app.use(express.json());

// use cors
app.use(cors(corsOptions));

// Test database connection on startup
async function testDatabase() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}
testDatabase();

//  Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: process.env.DB_NAME || "MySQL",
    port: port,
  });
});

// add the router to the app as middleware
app.use(router);

// start the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// export the web server for use it the application
module.exports = app;
