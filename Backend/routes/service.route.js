// import express module
const express = require("express");
// define router method from express module
const router = express.Router();

// import service controller function
const serviceController = require("../controllers/service.controller");

// add service router
router.post("/api/service", serviceController.addService);

// get all service
router.get("/api/services", serviceController.getAllServices);

// update a service
router.put("/api/service", serviceController.updateService);

// delete a service
router.delete(
  "/api/services/delete/:service_id",
  serviceController.deleteService,
);
module.exports = router;
