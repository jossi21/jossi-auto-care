// define the function which used to parse the token from local storage
const getToken = async () => {
  const token = JSON.parse(localStorage.getItem("employee"));

  // console.log("Token: ", token);
  if (token.employee_token) {
    const decodedToken = await decodeToken(token);
    // console.log("Decoded token: ", decodedToken);
    return {
      employee_role: decodedToken.employee_role,
      employee_first_name: decodedToken.employee_first_name,
      employee_token: token,
    };
  } else {
    return null;
  }
};

// the function used to decode the token
const decodeToken = async (token) => {
  const base64url = token.employee_token.split(".")[1];
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");

  // payload data
  const payLoadToken = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(""),
  );
  return JSON.parse(payLoadToken);
};

export default getToken;
