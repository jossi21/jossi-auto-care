// import database config
const conn = require("../config/db.config");

// check the vehicle if it is existed by its id
async function checkIfVehicleExist(vehicleTag) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_tag = ?";

  const rows = await conn.query(query, [vehicleTag]);
  return rows;
}

// the function which execute the query used to add vehicle
async function addVehicle(vehicleData) {
  const query =
    "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color ) VALUES(?, ?, ?,?, ?, ?,?, ?, ?)  ";

  const rows = await conn.query(query, [
    vehicleData.customer_id,
    vehicleData.vehicle_year,
    vehicleData.vehicle_make,
    vehicleData.vehicle_model,
    vehicleData.vehicle_type,
    vehicleData.vehicle_mileage,
    vehicleData.vehicle_tag,
    vehicleData.vehicle_serial,
    vehicleData.vehicle_color,
  ]);

  return {
    success: "true",
  };
}

// the function get the single vehicle by customer id
async function getVehicleByCustomerId(customer_id) {
  const query =
    "SELECT * FROM customer_vehicle_info INNER JOIN customer_identifier ON customer_identifier.customer_id = customer_vehicle_info.customer_id WHERE customer_identifier.customer_id = ? ";

  const rows = await conn.query(query, [customer_id]);
  return rows;
}

// the function get the single vehicle by vehicle id
async function getVehicleByVehicleID(vehicle_id) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ? ";

  const rows = await conn.query(query, [vehicle_id]);
  return rows;
}
// the function execute update vehicle query
async function updateVehicle(vehicleID, updateVehicle) {
  const query =
    "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ? , vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE vehicle_id = ? ";

  const rows = await conn.query(query, [
    updateVehicle.vehicle_year,
    updateVehicle.vehicle_make,
    updateVehicle.vehicle_model,
    updateVehicle.vehicle_type,
    updateVehicle.vehicle_mileage,
    updateVehicle.vehicle_tag,
    updateVehicle.vehicle_serial,
    updateVehicle.vehicle_color,
    vehicleID,
  ]);

  return {
    success: "true",
  };
}
// export the function
module.exports = {
  checkIfVehicleExist,
  addVehicle,
  getVehicleByCustomerId,
  getVehicleByVehicleID,
  updateVehicle,
};
