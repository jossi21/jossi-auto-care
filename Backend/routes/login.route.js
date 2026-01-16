// import express to use route module from it
const express = require("express");

// initiate the route
const router = express.Router();

// import loginController
const loginController = require("../controllers/login.controller");

// define the router of login
router.use("/api/employee/login", loginController.loginUser);

// export the module
module.exports = router;
