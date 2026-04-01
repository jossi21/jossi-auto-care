// import the db config
const conn = require("../config/db.config");
// import bcrypt;
const bcrypt = require("bcrypt");

// define the function which excite employee status
async function checkIfEmployeeExists(email) {
  // the query get all employee data
  const query = "SELECT * FROM employee WHERE employee_email = ?";
  const rows = await conn.query(query, [email]);
  // console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// after checked the employee status if it return we will define the function which handel employee creating process
async function createEmployee(employeeData) {
  // define the variable hole the created employee
  let createdEmployee = {};
  try {
    // first thing generate salt and hashed the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      employeeData.employee_password,
      salt,
    );

    //  the query Insert the employee email and active employee  in to employee table
    const query1 =
      "INSERT INTO employee (employee_email, active_employee) VALUES ( ?, ? )";

    const rows1 = await conn.query(query1, [
      employeeData.employee_email,
      employeeData.active_employee,
    ]);
    // console.log(rows1);

    // break the function if the user email didn't insert in to employee table
    if (rows1.affectedRows !== 1) {
      return false;
    }
    // get employee id from the employee table
    const employee_id = rows1.insertId;

    // the query insert employee first & last name and phone number
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";

    const rows2 = await conn.query(query2, [
      employee_id,
      employeeData.employee_first_name,
      employeeData.employee_last_name,
      employeeData.employee_phone,
    ]);
    // console.log(rows2);

    // the query insert employee password in to employee_pass table
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES ( ?, ?)";

    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    // console.log(rows3);
    // the query insert employee role in to employee_role
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id ) VALUES  (?, ?)";

    const rows4 = await conn.query(query4, [
      employee_id,
      employeeData.company_role_id,
    ]);
    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
    // console.log(rows4);
  } catch (error) {
    console.log(error);
  }

  // return the employee object
  return createdEmployee;
}

// the function get employee by it email
async function getEmployeeByEmail(employee_email) {
  // the query gets employee info, role and password by it's email
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ? ";

  const rows5 = await conn.query(query, [employee_email]);
  return rows5;
}

// the function which get employees from the data base
async function getAllEmployee() {
  // the query
  const query =
    "SELECT employee.employee_id, employee.employee_email, employee_info.employee_first_name, employee_info.employee_last_name, employee_info.employee_phone, employee.active_employee, employee.added_date, employee_role.company_role_id, company_roles.company_role_name FROM employee JOIN employee_info ON employee.employee_id = employee_info.employee_id JOIN employee_role ON employee.employee_id = employee_role.employee_id JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 15";
  const rows = await conn.query(query);
  return rows;
}

// get employee by it's id
async function getEmployeeById(employee_id) {
  const query = "SELECT * FROM employee WHERE employee.employee_id = ?";
  const rows = await conn.query(query, [employee_id]);
  return rows;
}
// the query used to update employee data
async function updateEmployee(employee_id, updateData) {
  // query used to update employee status
  const query1 =
    "UPDATE employee SET active_employee = ? WHERE employee_id = ?";
  const rows = await conn.query(query1, [
    updateData.active_employee,
    employee_id,
  ]);

  // query used to update employee info table
  const query2 =
    "UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? WHERE employee_id = ? ";

  const rows2 = await conn.query(query2, [
    updateData.employee_first_name,
    updateData.employee_last_name,
    updateData.employee_phone,
    employee_id,
  ]);

  // query used to update employee role
  const query3 =
    "UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?";

  const rows3 = await conn.query(query3, [
    updateData.company_role_id,
    employee_id,
  ]);

  return { success: "true" };
}

// the query which delete the employee
async function deleteEmployee(employee_id) {
  // delete from password table
  const query1 = "DELETE FROM employee_pass WHERE employee_id = ?";

  const rows1 = await conn.query(query1, [employee_id]);

  // delete from role table
  const query2 = "DELETE FROM employee_role WHERE employee_id = ?";

  const row2 = await conn.query(query2, [employee_id]);

  // delete from info table
  const query3 = "DELETE FROM employee_info WHERE employee_id = ?";

  const rows3 = await conn.query(query3, [employee_id]);

  // delete from employee table
  const query4 = "DELETE FROM employee_pass WHERE employee_id = ?";

  const rows4 = await conn.query(query4, [employee_id]);

  return {
    status: "success",
    message: "Employee deleted successfully",
  };
}

// export the functions
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
