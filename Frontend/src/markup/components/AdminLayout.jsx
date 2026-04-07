import React from "react";
import { Outlet } from "react-router-dom";
import AuthorizationCheckerPage from "./AuthorizationChecker/AuthorizationCheckerPage";
import Admin from "../pages/Admin/Admin";
const AdminLayout = () => {
  return (
    <>
      <AuthorizationCheckerPage roles={[3]}>
        <Admin>
          <Outlet />
        </Admin>
      </AuthorizationCheckerPage>
    </>
  );
};

export default AdminLayout;
