// import express
const express = require("express");

// define express router method
const router = express.Router();

// import vehicle controller
const vehicleController = require("../controllers/vehicle.controller");

// set add vehicle router
router.post("/api/vehicle", vehicleController.addVehicle);

// get vehicle router
router.get("/api/vehicle/:id", vehicleController.getSingleVehicle);

// update vehicle router
router.put("/api/vehicle", vehicleController.updateVehicle);

module.exports = router;
