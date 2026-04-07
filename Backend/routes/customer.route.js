// import express module
const express = require("express");

// define route method from express module
const router = express.Router();

// import the controller which used to control customer
const customerController = require("../controllers/customer.controller");

// define the router used to create customer
router.post("/api/customer", customerController.addCustomer);

// define the router used to get customers
router.get("/api/customers", customerController.getAllCustomers);

// get single customer
router.get("/api/customer/:id", customerController.getSingleCustomer);

// update the customer
router.put("/api/customer", customerController.updateCustomer);

// export the router
module.exports = router;
