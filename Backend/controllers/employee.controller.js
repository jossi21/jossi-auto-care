// import employeeService
const employeeService = require("../services/employee.service");

// define the function that controller employee creating process
async function createEmployee(req, res, next) {
  // check if the user existed
  const existedEmployee = await employeeService.checkIfEmployeeExists(
    req.body.employee_email,
  );
  if (existedEmployee) {
    res.status(400).json({
      error: "This email address already associated with another employee",
    });
  }

  try {
    // get the employee data
    const employeeData = req.body;
    // the function which control creating
    const employee = await employeeService.createEmployee(employeeData);
    if (!employee) {
      res.status(400).json({
        error: "Failed to add employee",
      });
    } else {
      res.status(200).json({
        success: "Employee added successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}

// export the function
module.exports = { createEmployee };
