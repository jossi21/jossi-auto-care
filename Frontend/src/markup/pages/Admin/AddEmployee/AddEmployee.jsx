import React from "react";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import AddEmployeeForm from "../../../components/Admin/AddEmployee/AddEmployeeForm";

const AddEmployee = () => {
  return (
    <div class="d-flex bg-light ">
      <div class="col-md-3">
        <AdminMenu />
      </div>
      <div class="col-md-9">
        <AddEmployeeForm />
      </div>
    </div>
  );
};

export default AddEmployee;
