//  import express
const express = require("express");
// import .env
require("dotenv").config();
// import the router to use in the app
const router = require("./routes");
// import cors module
const cors = require("cors");
// import the variable that hold our server port
const port = process.env.PORT;

// define cors options
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionSuccessStatus: 200,
};
// create web server
const app = express();

// Body parser
app.use(express.json());

// use cors
app.use(cors(corsOptions));
// add the router to the app as middleware
app.use(router);
// start the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// export the web server for use it the application
module.exports = app;
