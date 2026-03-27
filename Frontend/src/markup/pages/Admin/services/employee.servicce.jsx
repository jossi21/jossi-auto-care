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
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};
const employeeService = { addNewEmployee };

export default employeeService;
