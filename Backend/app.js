// import dotenv module
require("dotenv").config();

// import express module
const express = require("express");

// import cors module to give permission to specific domains
const cors = require("cors");
// console.log("DB URL:", process.env.DATABASE_URL);

// import sanitize-html
const { sanitizeMid } = require("./utils/sanitizeMiddleware");

// import main router
const mainRouter = require("./routes/index");

//import port from .env
const port = process.env.PORT;

// create he webserver
const app = express();

// set cors option
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStates: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
};

// convert the response text in to json form
app.use(express.json());

// just use the middleware
app.use(sanitizeMid);

// use the cors
app.use(cors(corsOptions));

// use the mainRouter
app.use(mainRouter);
// test
app.get("/", (req, res) => {
  res.send("The Server Running ");
});

// start the webserver
app.listen(port, () => {
  console.log(`Server runs on port: http://localhost:${port}`);
});
