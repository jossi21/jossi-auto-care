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

// import customer router
const customerRouter = require("./customer.route");

// import vehicle router
const vehicleRouter = require("./vehicle.route");

// import service router
const serviceRouter = require("./service.route");

//***************
// add the install router to the main router
//  */
// use the route
router.use(instalRouter);

// use the route
router.use(employeeRouter);

// add login route in to application
router.use(loginRouter);

// use customer router
router.use(customerRouter);

// use vehicle router
router.use(vehicleRouter);

// use service router
router.use(serviceRouter);
// export the router
module.exports = router;
