// import employeeService
const employeeService = require("../services/employee.service");

// define the function that controller employee creating process
async function createEmployee(req, res, next) {
  // check if the user existed
  const existedEmployee = await employeeService.checkIfEmployeeExists(
    req.body.employee_email,
  );
  if (existedEmployee) {
    return res.status(400).json({
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
    // console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}

// the function which get all employees
async function getAllEmployee(req, res, next) {
  try {
    // fetch all employees from service
    const allEmployee = await employeeService.getAllEmployee();

    // check if no employees found
    if (!allEmployee || allEmployee.length === 0) {
      return res.status(400).json({
        success: true,
        error: "Failed to get all employee",
      });
    }

    // return all employees
    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      contacts: allEmployee,
    });
  } catch (error) {
    console.error(error);
    // send server error response
    res.status(500).json({
      success: false,
      error: "Something went wrong while fetching employees",
    });
  }
}

// the controller used to update the employee
async function updateEmployee(req, res, next) {
  try {
    // get data from the user
    const { employee_id, ...updateData } = req.body;
    // console.log("Employee ID:", employee_id);
    // console.log("Update Data:", updateData);

    // get the user by using it's email
    if (!employee_id) {
      res.status(400).json({
        status: "fail",
        error: "Employee ID required",
      });
    }
    const IdentifiedEmployee =
      await employeeService.getEmployeeById(employee_id);

    if (!IdentifiedEmployee && IdentifiedEmployee.length === 0) {
      res.status(404).json({
        status: "fail",
        error: "Employee not Found ",
      });
    }

    const updatedResult = await employeeService.updateEmployee(
      employee_id,
      updateData,
    );
    res.status(200).json({
      status: "success",
      message: "Employee update successfully",
      data: updatedResult,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}

// delete employee controller
async function deleteEmployee(req, res) {
  try {
    const { employee_id } = req.params;
    if (!employee_id) {
      return res.status(400).json({
        status: "fail",
        error: "Employee ID required",
      });
    }

    const deletedEmployee = await employeeService.deleteEmployee(employee_id);
    res.status(200).json({
      status: "success",
      message: deletedEmployee.message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
}
// export the function
module.exports = {
  createEmployee,
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
};
