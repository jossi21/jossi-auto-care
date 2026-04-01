import React from "react";
import Header from "../markup/components/Header/Header";
import Footer from "../markup/components/Footer/Footer";
import { Route, Routes } from "react-router";
import Home from "../markup/pages/Home/Home";
import Login from "../markup/pages/Login/Login";
import AddEmployee from "../markup/pages/Admin/employee/AddEmployee";
import Unauthorized from "../markup/pages/unauthorized/Unauthorized";
import AuthorizationCheckerPage from "../markup/components/AuthorizationChecker/AuthorizationCheckerPage";
import AddCustomer from "../markup/pages/Admin/customer/AddCustomer";
import AddOrder from "../markup/pages/Admin/order/AddOrder";
import AdminDashboard from "../markup/pages/Admin/adminDashbor/AdminDashboard";
import Admin from "../markup/pages/Admin/Admin";
import About from "../markup/pages/About/About";
import Service from "../markup/pages/Service/Service";
import Contact from "../markup/pages/Contact/Contact";
import EmployeeList from "../markup/components/Admin/Employee/EmployeeList";
import EditEmployee from "../markup/pages/Admin/employee/EditEmployee";
const router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AuthorizationCheckerPage roles={[3]}>
              <Admin>
                <AdminDashboard />
              </Admin>
            </AuthorizationCheckerPage>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <AuthorizationCheckerPage roles={[3]}>
              <Admin>
                <AddEmployee />
              </Admin>
            </AuthorizationCheckerPage>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <AuthorizationCheckerPage roles={[3]}>
              <Admin>
                <EmployeeList />
              </Admin>
            </AuthorizationCheckerPage>
          }
        />
        <Route
          path="/admin/employee/edit/:employeeI"
          element={
            <AuthorizationCheckerPage roles={[3]}>
              <Admin>
                <EditEmployee />
              </Admin>
            </AuthorizationCheckerPage>
          }
        />
        <Route
          path="/admin/add-customer"
          element={
            <AuthorizationCheckerPage roles={[2, 3]}>
              <Admin>
                <AddCustomer />
              </Admin>
            </AuthorizationCheckerPage>
          }
        />
        <Route
          path="/add-order"
          element={
            <AuthorizationCheckerPage roles={[1, 2, 3]}>
              <AddOrder />
            </AuthorizationCheckerPage>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <Footer />
    </>
  );
};

export default router;
