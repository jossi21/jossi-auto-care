// Api end point connect with the backend
const api_url = import.meta.env.VITE_API_URL;

// the function used to get the vehicle data
const getVehicle = async (customer_id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${api_url}/api/vehicles/${customer_id}`,
    requestOptions,
  );
  return response;
};

// the function used to get the vehicle data
const getVehicleByVehicleId = async (vehicle_id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${api_url}/api/vehicle/${vehicle_id}`,
    requestOptions,
  );
  return response;
};

// add vehicle
const addVehicle = async (vehicleData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicleData),
  };

  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};

// update vehicle
const updateVehicle = async (updateData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};
const VehicleService = {
  getVehicle,
  getVehicleByVehicleId,
  addVehicle,
  updateVehicle,
};

export default VehicleService;
