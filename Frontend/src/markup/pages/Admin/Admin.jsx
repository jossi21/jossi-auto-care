import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

const Admin = ({ children }) => {
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
};

export default Admin;
