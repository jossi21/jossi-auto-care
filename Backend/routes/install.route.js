// import express module
const express = require("express");

// call router from express
const router = express.Router();

// import install handler function from the controller
const installController = require("../controllers/install.controller");

// set up the router to handle the install request
router.get("/install", installController.install);

// export the router
module.exports = router;
