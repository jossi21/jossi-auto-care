// import database config
const conn = require("../config/db.config");

// the function which check the service exist by service name
async function checkIfServiceExist(serviceName) {
  const query = "SELECT * FROM common_services WHERE service_name = ?";
  const rows = await conn.query(query, [serviceName]);
  return rows;
}
// define the function which add service in to the database
async function addService(serviceData) {
  const query =
    "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
  const rows = await conn.query(query, [
    serviceData.service_name,
    serviceData.service_description,
  ]);
  return {
    success: "true",
  };
}

// get all service function
async function getAllServices() {
  const query = "SELECT * FROM common_services";
  const rows = await conn.query(query);
  return rows;
}

// update the service by it id
async function updateService(updateData) {
  const query =
    "Update common_services SET service_name = ?, service_description = ? WHERE service_id = ?";

  const rows = await conn.query(query, [
    updateData.service_name,
    updateData.service_description,
    updateData.service_id,
  ]);
  return {
    success: "true",
  };
}

// delete service
async function deleteService(service_id) {
  const query = "DELETE FROM common_services WHERE service_id = ?";
  const rows = await conn.query(query, [service_id]);
  return rows;
}
const serviceService = {
  checkIfServiceExist,
  addService,
  getAllServices,
  updateService,
  deleteService,
};

// export the function
module.exports = serviceService;
