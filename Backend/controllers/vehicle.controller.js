// import vehicle service
const vehicleService = require("../services/vehicle.service");
// add vehicleController
async function addVehicle(req, res) {
  try {
    const vehicleData = req.body;
    const existedVehicle = await vehicleService.checkIfVehicleExist(
      vehicleData.vehicle_tag,
    );

    if (existedVehicle && existedVehicle.length > 0) {
      return res.status(402).json({
        status: "fail",
        error: "The vehicle tag is already registered to another vehicle",
      });
    }

    const vehicle = await vehicleService.addVehicle(vehicleData);
    if (!vehicle) {
      res.status(401).json({
        status: "fail",
        error: "Vehicle not added",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Vehicle added successfully",
      data: vehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

// get single vehicle
async function getVehicleByCustomerId(req, res) {
  try {
    const { customer_id } = req.params;
    const vehicleInfo =
      await vehicleService.getVehicleByCustomerId(customer_id);
    if (!vehicleInfo && vehicleInfo.length === 0) {
      return res.status(402).json({
        status: "fail",
        error: "Vehicle data couldn't find with this customer ID",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Vehicle data fetched successfully",
      data: vehicleInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

// get single vehicle by its id
async function getVehicleByVehicleID(req, res) {
  try {
    const { vehicle_id } = req.params;
    const vehicleInfo = await vehicleService.getVehicleByVehicleID(vehicle_id);
    if (!vehicleInfo && vehicleInfo.length === 0) {
      return res.status(402).json({
        status: "fail",
        error: "Vehicle data couldn't find with this vehicle ID",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Vehicle data fetched successfully",
      data: vehicleInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

// update vehicle
async function updateVehicle(req, res) {
  try {
    const { vehicle_id, ...updateVehicle } = req.body;
    const response = await vehicleService.updateVehicle(
      vehicle_id,
      updateVehicle,
    );

    if (!vehicle_id) {
      return res.status(401).json({
        status: "fail",
        error: "Vehicle ID not found",
      });
    }

    if (!response) {
      return res.status(403).json({
        status: "fail",
        error: "Unable to update vehicle",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Vehicle updated successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

module.exports = {
  addVehicle,
  getVehicleByCustomerId,
  getVehicleByVehicleID,
  updateVehicle,
};
