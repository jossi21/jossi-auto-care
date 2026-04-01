import React, { useEffect, useState } from "react";
import getToken from "../../../utils/Auth";
import { Navigate } from "react-router-dom";
const AuthorizationCheckerPage = ({ roles, children }) => {
  //   define the sates that check the user logged status role and the condition
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  //   use useEffect to check the user
  useEffect(() => {
    // get the function which check the user login status from utils folder
    const loggedEmployee = getToken();
    // console.log("logged user promise: ", loggedEmployee);
    loggedEmployee.then((res) => {
      // console.log("User role:", res.employee_role);
      // console.log("user token:", res.employee_token);
      if (res?.employee_token) {
        setIsLogged(true);
        // check the user role
        if (roles && roles.length > 0 && roles.includes(res.employee_role)) {
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [roles]);
  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" replace />;
    }

    if (!isAuthorized) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  return children;
};

export default AuthorizationCheckerPage;
