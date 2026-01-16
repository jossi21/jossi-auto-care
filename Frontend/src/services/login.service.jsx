// import the back end url from the evn
const api_url = import.meta.env.VITE_API_URL;

// define the login function
const Login = async (loginDataFromTheUser) => {
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginDataFromTheUser),
  };

  console.log(requestOption.body);
  //   fetch the data from the database
  const response = await fetch(`${api_url}/api/employee/login`, requestOption);

  return response;
};

// export the function
export default {
  Login,
};
