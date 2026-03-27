// import express
const express = require("express");

// import router method from express
const router = express.Router();

// import install router
const instalRouter = require("./install.route");

// import employee router
const employeeRouter = require("./employee.route");

// import login router
const loginRouter = require("./login.route");

// add the install router to the main router
router.use(instalRouter);

// use the route
router.use(employeeRouter);

// add login route in to application
router.use(loginRouter);

// export the router
module.exports = router;
