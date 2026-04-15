// import the orderService
const { all } = require("../routes/order.route");
const orderService = require("../services/order.service");

// the controller which used to create the order
async function addOrder(req, res) {
  try {
    const orderData = req.body;

    const existedOrder = await orderService.checkIfOrderExists(orderData);

    if (existedOrder && existedOrder.length > 0) {
      return res.status(403).json({
        status: "fail",
        error: "Order duplication",
      });
    }

    const response = await orderService.addOrder(orderData);

    return res.status(200).json({
      status: "success",
      message: "Order created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

// getAllOrders controller
async function getAllOrders(req, res) {
  try {
    const allOrders = await orderService.getAllOrders();
    if (!allOrders) {
      return res.status(403).json({
        status: "fail",
        error: "Couldn't fetch orders",
      });
    }

    return res.status(200).json({
      data: allOrders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      error: error || "Something went wrong",
    });
  }
}

// get single order controller
async function getOrderByVehicleId(req, res) {
  try {
    const { order_id } = req.params;

    if (!order_id) {
      return res.status(400).json({
        status: "fail",
        error: "Order ID is required",
      });
    }

    const response = await orderService.getOrderByVehicleId(order_id);

    if (!response) {
      return res.status(404).json({
        status: "fail",
        error: "Order data couldn't be found with this order ID",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Order data fetched successfully",
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

// get order id

async function getOrdersByCustomer(req, res) {
  try {
    const { customerId } = req.params;
    const orders = await orderService.getOrdersByCustomer(customerId);
    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
}
const orderController = {
  addOrder,
  getAllOrders,
  getOrderByVehicleId,
  getOrdersByCustomer,
};

// export module
module.exports = orderController;
