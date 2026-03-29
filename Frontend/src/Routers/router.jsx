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
const router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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
          path="/admin/add-customer"
          element={
            <AuthorizationCheckerPage roles={[2, 3]}>
              <AddCustomer />
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
