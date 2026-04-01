import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import { useAuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router";
import LoginForm from "../../components/LoginForm/LoginForm";

const Admin = ({ children }) => {
  const { isLogged, isAdmin } = useAuthContext();
  // console.log("Login status", isLogged);
  // console.log("Admin status", isAdmin);
  {
    if (isLogged) {
      if (isAdmin) {
        return (
          <div className="d-flex bg-light admin-layout-container">
            <div
              className="col-4 col-md-3 admin-menu-column "
              style={{ paddingLeft: 0 }}
            >
              <AdminMenu />
            </div>
            <div className="col-md-9 form-column">{children}</div>
          </div>
        );
      }
    } else {
      return <LoginForm />;
    }
  }
};

export default Admin;
