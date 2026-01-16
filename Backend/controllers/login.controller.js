// import the login service
const loginService = require("../services/login.service");

// import employee service
const employeeService = require("../services/employee.service");

// import jwt
const jwt = require("jsonwebtoken");

// import the secret key from the env
const jwtSecret = process.env.JWT_SECRET;

async function loginUser(req, res, next) {
  try {
    const loginData = req.body;
    // console.log(loginData);
    // console.log(req.headers);
    const employeeData = await loginService.loginUser(loginData);

    if (!employeeData) {
      return res.status(500).json({ status: "error", message: "Server error" });
    }

    if (employeeData.status === "success") {
      const employee = await employeeService.getEmployeeByItsEmail(
        loginData.employee_email
      );
      const employeeInfo = employee.employee_info?.[0] || {};
      const employeeRole = employee.employee_roles?.[0] || {};

      //  test the fetch data
      const payload = {
        employee_id: employee.employee_id,
        employee_email: employee.employee_email,
        employee_role: employeeRole.company_role_id,
        employee_first_name: employeeInfo.employee_first_name,
      };
      // console.log(payRole);

      // create token to logged user
      const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "24h",
      });
      // console.log(token);
      const createdToken = {
        employee_token: token,
      };

      return res.status(200).json({
        status: "success",
        message: "Employee Logged in Successfully",
        data: createdToken,
      });
    } else {
      return res.status(401).json(employeeData);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
}

// export the function
module.exports = { loginUser };
