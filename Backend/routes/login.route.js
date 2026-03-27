// import express
const express = require("express");

// define router method from the express module
const router = express.Router();

// import the function that control login process
const loginController = require("../controllers/login.controller");

// define the path
router.post("/api/employee/login", loginController.loginUser);

// export login router
module.exports = router;
