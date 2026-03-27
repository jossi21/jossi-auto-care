// import db config
const conn = require("../config/db.config");

// import bcrypt module to compare the user password
const bcrypt = require("bcrypt");

// import the function which used to get employee by email
const employeeService = require("./employee.service");

// the function check the user email and password
async function loginUser(userData) {
  try {
    // the object used to store the response
    let returnedData = {};
    // get the employee by it login email
    const employee = await employeeService.getEmployeeByEmail(
      userData.employee_email,
    );
    // console.log(employee);
    // check is the user exist
    if (employee.length === 0) {
      returnedData = {
        status: "fail",
        message: "The user doesn't exist",
      };
      return returnedData;
    }
    //  compare the password of the user by using bcrypt module
    const matchedPassword = await bcrypt.compare(
      userData.employee_password,
      employee[0].employee_password_hashed,
    );

    if (!matchedPassword) {
      returnedData = {
        status: "fail",
        message: "Incorrect password",
      };
      return returnedData;
    }

    returnedData = {
      status: "success",
      message: "User logged in successfully",
      data: employee[0],
    };
    return returnedData;
  } catch (error) {
    console.log(error);
    returnedData = {
      status: "fail",
      message: "Something went wrong",
    };
    return returnedData;
  }
}

// export the function
module.exports = { loginUser };
