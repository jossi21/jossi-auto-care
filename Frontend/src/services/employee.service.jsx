// import backend url
const api_url = import.meta.env.VITE_API_URL;
const AddEmployee = async (dataFromTheUser) => {
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataFromTheUser),
  };

  // post the data on the back end database
  const response = await fetch(`${api_url}/api/employee`, requestOption);
  return response;
};

// export the function
const employeeService = {
  AddEmployee,
};
export default employeeService;
