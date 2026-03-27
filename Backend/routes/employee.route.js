// import express
const express = require("express");

// import router from express
const router = express.Router();

// import the employeeController
const employeeController = require("../controllers/employee.controller");

// create the router api of employee based on the given documentation
router.post("/api/employee", employeeController.createEmployee);

// export the router module
module.exports = router;
