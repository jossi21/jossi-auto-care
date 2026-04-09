// import the back end url
const api_url = import.meta.env.VITE_API_URL;

// add service api
const addService = async (serviceData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  };

  const response = await fetch(`${api_url}/api/service`, requestOptions);
  return response;
};

// get all service api
const getAllServices = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response;
};

// update service
const updateService = async (updateData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  };

  const response = await fetch(`${api_url}/api/service`, requestOptions);
  return response;
};

// delete service
const deleteService = async (serviceId) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${api_url}/api/services/delete/${serviceId}`,
    requestOptions,
  );
  return response;
};

const serviceService = {
  addService,
  getAllServices,
  updateService,
  deleteService,
};

export default serviceService;
