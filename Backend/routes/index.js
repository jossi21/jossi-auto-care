// import express
const express = require("express");

// import router method from express
const router = express.Router();

// import the employee router
const employeeRouter = require("./employee.route");

//Add the employee router to the main route
router.use(employeeRouter);

// import login router
const loginRouter = require("./login.route");

// add login router
router.use(loginRouter);
// export the router
module.exports = router;
