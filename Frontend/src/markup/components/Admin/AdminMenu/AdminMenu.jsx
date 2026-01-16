import React from "react";
import classes from "./AdminMenu.module.css";
const AdminMenu = () => {
  return (
    <>
      {/* <!--Blog Category Widget--> */}
      <div className={classes.AdminMenu_outer_wrapper}>
        <div className={classes.AdminMenu_div}>
          <h4>ADMIN MENU</h4>
        </div>
        <div className={classes.adminmenu__inner__wrapper}>
          <a href="/Dashboard">Dashboard</a>
          <hr />
          <a href="/orders">Orders</a>
          <hr />
          <a href="/new-order">New order</a>
          <hr />
          <a href="/add-employee">Add employee</a>
          <hr />
          <a href="/employees">Employees</a>
          <hr />
          <a href="/add-customer">Add customer</a>
          <hr />
          <a href="/customers">Customers</a>
          <hr />
          <a href="/services">Services </a>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
