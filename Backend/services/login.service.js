// import bcrypt
const bcrypt = require("bcrypt");

// import the function which get the user by its email
const employeeService = require("./employee.service");

// write the function
async function loginUser(employeeData) {
  try {
    // handle the data which get by the email
    let returnData = {};
    const employee = await employeeService.getEmployeeByItsEmail(
      employeeData.employee_email
    );

    if (!employee) {
      returnData = {
        status: "fail",
        message: "Employee doesn't exist",
      };
      // console.log(returnData);
      return returnData;
    }
    // console.log(employee);

    // get hashed password from employee_pass table
    const hashedPassword =
      employee.employee_pass?.[0]?.employee_password_hashed;

    // compare passwords
    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      hashedPassword
    );

    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password",
      };
      return returnData;
    }
    // Extract info from nested employee_info array
    const employeeInfo = employee.employee_info?.[0] || {};
    const employeeRole = employee.employee_roles?.[0] || {};
    // if both condition success
    returnData = {
      status: "success",
    };
    // console.log(returnData);
    return returnData;
  } catch (error) {
    console.log(error);
  }
}

// export the function
module.exports = {
  loginUser,
};
