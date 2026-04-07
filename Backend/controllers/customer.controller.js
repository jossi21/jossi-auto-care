// controllers/customer.controller.js
const customerService = require("../services/customer.service");

async function addCustomer(req, res) {
  // console.log("Request body:", req.body);

  // First check if customer exists (like employee)
  const existedCustomer = await customerService.checkIfCustomerExist(
    req.body.customer_email,
  );

  if (existedCustomer) {
    return res.status(400).json({
      error: "This email address already associated with another customer",
    });
  }

  try {
    // Get the customer data
    const customerData = req.body;

    // The function which handles creating (like employee)
    const customer = await customerService.addCustomer(customerData);

    if (!customer) {
      res.status(400).json({
        error: "Failed to add customer",
      });
    } else {
      res.status(200).json({
        success: "Customer added successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}

// controller function
async function getAllCustomers(req, res) {
  try {
    // get the page and limit
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // validate the parse page and limit
    const validPage = page > 0 ? page : 1;
    const validLimit = limit > 0 && limit <= 100 ? limit : 5;
    const customerData = await customerService.getAllCustomers(
      validPage,
      validLimit,
    );
    if (!customerData || customerData.length === 0) {
      res.status(400).json({
        status: "fail",
        error: "Failed to get Customers",
      });
    }

    res.status(200).json({
      status: "success",
      message: "All customer fetched successfully",
      contacts: customerData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

// get single customer
async function getSingleCustomer(req, res) {
  try {
    const { id } = req.params;

    // get the customer by its is
    const singleCustomer = await customerService.getSingleCustomer(id);

    // check the response
    if (!singleCustomer) {
      res.status(401).json({
        status: "fail",
        message: "The customer doesn't exist",
      });
    }
    res.status(200).json({
      status: "success",
      message: "The customer fetched successfully",
      data: singleCustomer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

// update customer
async function updateCustomer(req, res) {
  try {
    const { customer_id, ...customerData } = req.body;
    if (!customer_id) {
      return res.status(400).json({
        status: "fail",
        error: "Customer ID not found",
      });
    }
    const updatedCustomer = await customerService.updateCustomer(
      customer_id,
      customerData,
    );
    res.status(200).json({
      status: "success",
      message: "Customer Updated successfully",
      data: updatedCustomer,
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
  addCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
};
