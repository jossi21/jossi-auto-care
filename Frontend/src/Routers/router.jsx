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
import About from "../markup/pages/About/About";
import Service from "../markup/pages/Service/Service";
import Contact from "../markup/pages/Contact/Contact";
import EmployeeList from "../markup/components/Admin/Employee/EmployeeList";
import EditEmployee from "../markup/pages/Admin/employee/EditEmployee";
import Customers from "../markup/pages/Admin/customer/Customers";
import EditCustomer from "../markup/pages/Admin/customer/EditCustomer";
import AdminLayout from "../markup/components/AdminLayout";
import CustomerProfile from "../markup/components/Admin/Customer/CustomerProfile";
import EditVehicle from "../markup/components/Admin/vehicle/EditVehicle";
import Services from "../markup/pages/Admin/service/Services";
import EditService from "../markup/components/Admin/service/EditService";
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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employees/:employeeId" element={<EditEmployee />} />
          <Route path="customers" element={<Customers />} />
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="customers/:id" element={<EditCustomer />} />
          <Route path="customer/profile/:id" element={<CustomerProfile />} />
          <Route path="customer/profile/edit/:id" element={<EditVehicle />} />
          <Route path="services" element={<Services />} />
          <Route path="services/edit/:id" element={<EditService />} />
        </Route>

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
