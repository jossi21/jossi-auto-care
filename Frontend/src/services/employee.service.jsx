// the function which fetch the data from the backend

// first import back end url
const api_url = import.meta.env.VITE_API_URL;
// console.log(api_url);

const addNewEmployee = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const res = await fetch(`${api_url}/api/employee`, requestOptions);
  return res;
};

// fetch all employee
const getAllEmployees = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
};

// update employee
const updateEmployee = async (updateData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  };

  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

// delete employee
const deleteEmployee = async (employee_id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${api_url}/api/employee/${employee_id}`,
    requestOptions,
  );

  return response;
};
const employeeService = {
  addNewEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;
