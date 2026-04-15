// import express module
const express = require("express");

// define Router method
const router = express.Router();

// import controller function
const orderController = require("../controllers/order.controller");

// add order router
router.post("/api/order", orderController.addOrder);

// get all orders
router.get("/api/orders", orderController.getAllOrders);

// get single order
router.get("/api/order/:order_id", orderController.getOrderByVehicleId);

// fetch order by customer id
router.get(
  "/api/orders/customer/:customerId",
  orderController.getOrdersByCustomer,
);
// export the router
module.exports = router;
