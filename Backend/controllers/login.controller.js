// import db config
const conn = require("../config/db.config");

// import jwt
const jwt = require("jsonwebtoken");

// import token secret key
const jwtSecret = process.env.JWT_SECRET;

//  import login service function
const loginService = require("../services/login.service");

// the function used to create token and store in to local memory
async function loginUser(req, res, next) {
  try {
    // console.log(req.body);
    //  store login data in to the variable
    let userData = req.body;

    // pass the email in to service login function
    const employee = await loginService.loginUser(userData);
    // console.log(employee);
    // the response if the user fail
    if (employee.status === "fail") {
      res.json({
        status: employee.status,
        message: employee.message,
      });
    }

    // // if the user is login successfully we generate the token and store it in local storage
    // // prepare the payload
    const payload = {
      employee_first_name: employee.data.employee_first_name,
      employee_role: employee.data.company_role_id,
    };
    // generate the token
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
    // put it in object form
    const employeeToken = {
      employee_token: token,
    };
    // console.log(token);
    // success response
    res.status(200).json({
      status: employee.status,
      message: employee.message,
      data: employeeToken,
    });
  } catch (error) {
    console.log(error);
  }
}

// export the function
module.exports = { loginUser };
