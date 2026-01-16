// import employee service
const employeeService = require("../services/employee.service");

// create the function that control employee creation process
async function addEmployee(req, res, next) {
  // check if the user have been created
  const employeeExisted = await employeeService.checkIfEmployeeExists(
    req.body.employee_email
  );

  // if the user exist
  if (employeeExisted) {
    res.status(400).json({
      error: "This email is already registered",
    });
  } else {
    try {
      const employeeData = req.body;
      // create the employee
      const employee = await employeeService.addEmployee(employeeData);

      //   if employee didn't created
      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee ",
        });
      } else {
        res.status(200).json({
          success: "Registered Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Something went wrong",
      });
    }
  }
}

// export the function
module.exports = { addEmployee };
