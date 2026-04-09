// import Service service function
const serviceService = require("../services/service.service");

// define add service controller function
async function addService(req, res) {
  try {
    const serviceData = req.body;

    // check the service if it existed
    const existedService = await serviceService.checkIfServiceExist(
      serviceData.service_name,
    );

    if (existedService && existedService.length > 0) {
      return res.status(402).json({
        status: "fail",
        error: "Duplication of service",
      });
    }

    const response = await serviceService.addService(serviceData);
    if (!response) {
      return res.status(403).json({
        status: "fail",
        error: "Service didn't added",
      });
    }

    return res.status(403).json({
      status: "success",
      message: "Service added successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

// get all services
async function getAllServices(req, res) {
  try {
    const response = await serviceService.getAllServices();

    if (!response || response.length === 0) {
      return res.status(403).json({
        status: "fail",
        error: "There isn't service",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Service fetched successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

// update a service
async function updateService(req, res) {
  try {
    const updateData = req.body;
    const response = await serviceService.updateService(updateData);

    if (!response || response.length === 0) {
      return res.status(403).json({
        status: "fail",
        error: "Service not found, please try again",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Service update successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

// delete service
async function deleteService(req, res) {
  try {
    const { service_id } = req.params;

    if (!service_id) {
      return res.status(401).json({
        status: "fail",
        error: "Service ID required",
      });
    }
    const response = await serviceService.deleteService(service_id);
    return res.status(200).json({
      status: "success",
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}
const serviceController = {
  addService,
  getAllServices,
  updateService,
  deleteService,
};

// export the functions
module.exports = serviceController;
