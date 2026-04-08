// Api end point connect with the backend
const api_url = import.meta.env.VITE_API_URL;

// the function used to get the vehicle data
const getVehicle = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${api_url}/api/vehicle/${id}`, requestOptions);
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
  addVehicle,
  updateVehicle,
};

export default VehicleService;
