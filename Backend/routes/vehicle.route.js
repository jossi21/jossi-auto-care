// import express
const express = require("express");

// define express router method
const router = express.Router();

// import vehicle controller
const vehicleController = require("../controllers/vehicle.controller");

// set add vehicle router
router.post("/api/vehicle", vehicleController.addVehicle);

// get vehicle router
router.get(
  "/api/vehicles/:customer_id",
  vehicleController.getVehicleByCustomerId,
);

//  get vehicle by its id
router.get("/api/vehicle/:vehicle_id", vehicleController.getVehicleByVehicleID);
// update vehicle router
router.put("/api/vehicle", vehicleController.updateVehicle);

module.exports = router;
