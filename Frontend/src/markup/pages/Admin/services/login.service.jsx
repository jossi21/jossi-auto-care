// import the backend url
const api_url = import.meta.env.VITE_API_URL;

// the function
const loginEmployee = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${api_url}/api/employee/login`, requestOptions);
  //   console.log(response);
  return response;
};

const loginService = { loginEmployee };

export default loginService;
