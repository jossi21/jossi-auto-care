import React from "react";
import Header from "../markup/components/Header/Header";
import Footer from "../markup/components/Footer/Footer";
import { Route, Routes } from "react-router";
import Home from "../markup/pages/Home/Home";
import Login from "../markup/pages/Login/Login";
import AddEmployee from "../markup/pages/Admin/employee/AddEmployee";
const router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  );
};

export default router;
