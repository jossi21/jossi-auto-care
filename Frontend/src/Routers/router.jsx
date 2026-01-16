import React from "react";
import { Route, Routes } from "react-router";
import Home from "../markup/pages/Home/Home";
import AddEmployee from "../markup/pages/Admin/AddEmployee/AddEmployee";
import Login from "../markup/pages/Login/Login";
import Header from "../markup/components/Header/Header";
import Footer from "../markup/components/Footer/Footer";
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
