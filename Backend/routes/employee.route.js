// import express
const express = require("express");

// import router from express
const router = express.Router();

// import the employeeController
const employeeController = require("../controllers/employee.controller");

// create the router api of employee based on the given documentation
router.post("/api/employee", employeeController.createEmployee);

// create the router api which get the list of employee
router.get("/api/employees", employeeController.getAllEmployee);

// update the employee
router.put("/api/employee", employeeController.updateEmployee);

// delete employee
router.delete("/api/employee/:employee_id", employeeController.deleteEmployee);

// export the router module
module.exports = router;
