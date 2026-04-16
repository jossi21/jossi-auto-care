import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import loginService from "../../../services/login.service";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const LoginForm = () => {
  // define states that holed the input values
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_password, setEmployeePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // error handler states
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // the function handle the submission process
  const loginHandler = (e) => {
    // prevent default behavior of the browser
    e.preventDefault();

    // Here is the validation process
    let flag = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // email validation
    if (!employee_email) {
      setEmailErr("email address required");
      flag = false;
    } else if (!emailRegex.test(employee_email)) {
      setEmailErr("Allowed email (example@gmail.com)");
      flag = false;
    } else {
      setEmailErr("");
    }

    // password validation
    if (!employee_password) {
      setPasswordErr("password required");
      flag = false;
    } else if (employee_password.length <= 6) {
      setPasswordErr("password must be at least 6 char");
      flag = false;
    } else {
      setPasswordErr("");
    }

    if (!flag) {
      return;
    }
    const formData = {
      employee_email,
      employee_password,
    };
    // console.log(formData);
    setLoading(true);
    setServerError("");
    setSuccessResponse("");

    const singedEmployee = loginService.loginEmployee(formData);
    // console.log(singedEmployee);
    singedEmployee
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "success") {
          // console.log(data.employee_token);
          if (data.data && data.data.employee_token) {
            localStorage.setItem("employee", JSON.stringify(data.data));
          }
          if (location.pathname === "/login") {
            setSuccessResponse(data.message);
            setTimeout(() => {
              setLoading(false);
              window.location.replace("/");
            }, 2000);
          } else {
            setLoading(false);
            window.location.replace();
          }
        } else {
          setLoading(false);
          setTimeout(() => {
            setServerError(data.message);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setTimeout(() => {
          setServerError(err.message);
        }, 3000);
      });
  };
  return (
    <>
      {/* <!--login Section--> */}
      <section className="contact-section">
        <div className={`auto-container ${classes.login__form}`}>
          <div className="contact-title">
            <h2>Login to your account</h2>
          </div>
          <div className="row clearfix">
            {/* <!--Contact Form--> */}
            <form method="post" id="contact-form" onSubmit={loginHandler}>
              {serverError ? (
                <div className={classes.server__error__message}>
                  {serverError}
                </div>
              ) : (
                <div className={classes.success__response__message}>
                  {successResponse}
                </div>
              )}
              <div className="">
                {/* email input */}
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="email"
                    placeholder="Your Email"
                    autoComplete="email"
                    className={emailErr ? classes.input__error : ""}
                    value={employee_email}
                    onChange={(e) => setEmployeeEmail(e.target.value)}
                  />
                  {emailErr && (
                    <div className={classes.error__message}>{emailErr}</div>
                  )}
                </div>
                {/* input password */}
                <div className="form-group col-md-12">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="form_subject"
                    placeholder="Employee password"
                    autoComplete="current-password"
                    className={passwordErr ? classes.input__error : ""}
                    value={employee_password}
                    onChange={(e) => setEmployeePassword(e.target.value)}
                  />
                  <button
                    style={{ cursor: "pointer", zIndex: 10 }}
                    type="button"
                    className="position-absolute end-0 top-0 mt-2 me-4 border-0 bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {passwordErr && (
                    <div className={classes.error__message}>{passwordErr}</div>
                  )}
                </div>

                <div className="form-group col-md-12">
                  <button
                    className="theme-btn btn-style-one"
                    type="submit"
                    data-loading-text="Please wait..."
                  >
                    {" "}
                    {loading ? <span>Please Wait...</span> : <span>Login</span>}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
