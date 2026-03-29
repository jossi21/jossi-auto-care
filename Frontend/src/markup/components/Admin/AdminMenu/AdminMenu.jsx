import React from "react";
import classes from "./AdminMenu.module.css";
import { Link } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      {/* <!--Blog Category Widget--> */}
      <div className={classes.AdminMenu_outer_wrapper}>
        <div className={classes.AdminMenu_div}>
          <h4>ADMIN MENU</h4>
        </div>
        <div className={classes.adminmenu__inner__wrapper}>
          <Link to="/admin">Dashboard</Link>
          <hr />
          <Link to="/orders">Orders</Link>
          <hr />
          <Link to="/new-order">New order</Link>
          <hr />
          <Link to="/admin/add-employee">Add employee</Link>
          <hr />
          <Link to="/admin/employees">Employees</Link>
          <hr />
          <Link to="/admin/add-customer">Add customer</Link>
          <hr />
          <Link to="/admin/customers">Customers</Link>
          <hr />
          <Link to="/services">Services </Link>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
