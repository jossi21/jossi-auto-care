import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";
import loginService from "../../../services/login.service";

const LoginForm = () => {
  // initiate useState
  const nav = useNavigate();
  const location = useLocation();
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_password, setEmployeePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // set the handler function
  const LoginHandler = async (e) => {
    // prevent the default
    e.preventDefault();
    setLoading(true);

    // clear previous errors
    setServerError("");
    setEmailError("");
    setPasswordError("");

    // set the flag that control the validation of the form
    let valid = true;

    // now set up the validation of email
    if (!employee_email) {
      setEmailError("Please first enter the email");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    // initiate password validation
    if (!employee_password || employee_password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    // if the form is not valid
    if (!valid) {
      return;
    }

    // now put the data get from the user with in a variable
    const loginDataFromTheUser = {
      employee_email,
      employee_password,
    };
    // sef if the data get
    console.log(loginDataFromTheUser);

    // call the service
    const loggedEmployee = loginService.Login(loginDataFromTheUser);
    // test it
    console.log(loggedEmployee);
    loggedEmployee
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        // make it conditional
        if (response.status === "success") {
          // save the user in the local storage
          if (response.data.employee_token) {
            console.log(response.data);
            localStorage.setItem(
              "employee",
              JSON.stringify(response.data.employee_token)
            );
          }
          // redirect the user to the dashboard
          console.log(location);
          if (location.pathname === "/login") {
            window.location.replace("/");
          } else {
            window.location.reload();
          }
        } else {
          setServerError(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setServerError("Something happened. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {/* <!--login Section--> */}
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Login to your account</h2>
          </div>
          <div className="row clearfix">
            {/* <!--Form Column--> */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                {/* <!--Contact Form--> */}
                <div className="contact-form">
                  <form
                    method="post"
                    action="sendemail.php"
                    id="contact-form"
                    onSubmit={LoginHandler}
                  >
                    <div className="row clearfix">
                      {serverError && (
                        <div className={classes.error__message}>
                          {serverError}
                        </div>
                      )}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="employee_email"
                          placeholder="Your Email"
                          required
                          value={employee_email}
                          onChange={(e) => setEmployeeEmail(e.target.value)}
                          autoComplete="email"
                        />
                        {emailError && (
                          <div className={classes.error__message}>
                            {emailError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="employee_password"
                          placeholder="password"
                          required
                          value={employee_password}
                          onChange={(e) => setEmployeePassword(e.target.value)}
                          autoComplete="current-password"
                        />
                        {passwordError && (
                          <div className={classes.error__message}>
                            {passwordError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          {loading ? (
                            <span>Please Wait...</span>
                          ) : (
                            <span>Login</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/* <!--End Contact Form--> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
