import React, { useContext, useEffect, useState } from "react";
import getToken from "../utils/Auth";
// create auth context
const AuthContext = React.createContext();

// create custom useContext hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};
// create the provider
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);

  // put the values with in the variable
  const provValue = { isLogged, setIsLogged, isAdmin, setIsAdmin, employee };

  // use the variable which get getToken function
  const loggedEmployee = getToken();
  //   return the provider
  // console.log("Logged employee data", loggedEmployee);
  useEffect(() => {
    loggedEmployee.then((res) => {
      if (res?.employee_token) {
        setIsLogged(true);
        if (res?.employee_role === 3) {
          setIsAdmin(true);
        }
        setEmployee(res);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={provValue}>{children}</AuthContext.Provider>
  );
};
