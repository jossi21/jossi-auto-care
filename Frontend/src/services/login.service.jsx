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

// the function which delete the token from local storage
const logOut = async () => {
  // the method used to remove the token
  localStorage.removeItem("employee");
};
const loginService = { loginEmployee, logOut };

export default loginService;
