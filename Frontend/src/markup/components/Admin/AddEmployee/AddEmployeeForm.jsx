import React, { use, useState } from "react";
import classes from "./AddEmployee.module.css";
import employeeService from "../../../../services/employee.service";

const AddEmployeeForm = () => {
  // initiate the states which used to get values provide by the user
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_first_name, setEmployeeFirstName] = useState("");
  const [employee_last_name, setEmployeeLastName] = useState("");
  const [employee_phone, setEmployeePhone] = useState("");
  const [employee_password, setEmployeePassword] = useState("");
  const [company_role_id, setCompanyRoleId] = useState(1);
  const [active_employee, setActiveEmployee] = useState(1);

  // states used to handle Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // implement add employee handler
  const addEmployeeHandler = async (e) => {
    // prevent the default ven of the browser
    e.preventDefault();

    // start loading
    setLoading(true);

    // set up Flag
    let Flag = true;

    // validation of the email
    if (!employee_email) {
      setEmailError("Please enter your email");
      Flag = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      Flag = false;
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }

    // validation of the first name
    if (!employee_first_name) {
      setFirstNameError("Please enter your first name");
      Flag = false;
    } else {
      setFirstNameError("");
    }

    // validation of last name
    if (!employee_last_name) {
      setLastNameError("Please enter your last name");
      Flag = false;
    } else {
      setLastNameError("");
    }

    // validation of the phone number
    if (!employee_phone) {
      setPhoneNumberError("Please enter your phone number");
      Flag = false;
    } else {
      const regex = /^(\+251|0)(9\d{8}|[1-9]\d{7,8})$/;
      if (!regex.test(employee_phone)) {
        setPhoneNumberError("Enter valid phone number");
        Flag = false;
      } else {
        setPhoneNumberError("");
      }
    }

    // validation of password
    if (!employee_password || employee_password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      Flag = false;
    } else {
      setPasswordError("");
    }

    // if the form is no valid
    if (!Flag) {
      return;
    }

    // now collect the data which get from the user
    const dataFromTheUser = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
      employee_password,
    };

    try {
      //pase the data get from the form
      const response = await employeeService.AddEmployee(dataFromTheUser);

      // Check if response is OK
      if (!response.ok) {
        // Handle HTTP errors (404, 500, etc.)
        const errorText = await response.text();
        throw new Error("Cannot connect to server.");
      }

      const data = await response.json();

      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccess(true);
        setServerError("");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);

      // Show user-friendly error
      if (error.message.includes("Failed to fetch")) {
        setServerError("Cannot connect to server.");
      } else {
        setServerError("Cannot connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <!--login Section--> */}
      <section
        className={`contact-section ${classes.employee__outer__wrapper}`}
      >
        <div className="auto-container">
          <div className={`contact-title ${classes.addEmployee_title}`}>
            <h2>Add a new employee</h2>
          </div>
          <div className="row clearfix">
            {/* <!--Form Column--> */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                {/* <!--Contact Form--> */}
                <div className={classes.addEmployee_form}>
                  <form
                    method="post"
                    id="contact-form"
                    onSubmit={addEmployeeHandler}
                  >
                    <div className="row clearfix">
                      {serverError && (
                        <div className={classes.error__message} role="alert">
                          {serverError}
                        </div>
                      )}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="email"
                          placeholder="Your Email"
                          required
                          value={employee_email}
                          onChange={(e) => setEmployeeEmail(e.target.value)}
                        />
                        {emailError && (
                          <div className={classes.error__message} role="alert">
                            {emailError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="first-name"
                          placeholder="Employee first name"
                          value={employee_first_name}
                          onChange={(e) => setEmployeeFirstName(e.target.value)}
                        />
                        {firstNameError && (
                          <div className={classes.error__message} role="alert">
                            {firstNameError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="last-name"
                          placeholder="Employee last name"
                          value={employee_last_name}
                          onChange={(e) => setEmployeeLastName(e.target.value)}
                        />
                        {lastNameError && (
                          <div className={classes.error__message} role="alert">
                            {lastNameError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="tel"
                          name="phone-number"
                          placeholder="Employee phone "
                          required
                          value={employee_phone}
                          onChange={(e) => setEmployeePhone(e.target.value)}
                        />
                        {phoneNumberError && (
                          <div className={classes.error__message} role="alert">
                            {phoneNumberError}
                          </div>
                        )}
                      </div>

                      <div className={` form-group col-md-12 `}>
                        <select
                          name="role"
                          className={`col-md-12 py-2  ${classes.add_employee_role}`}
                        >
                          <option value="1">Employee</option>
                          <option value="2">Manager</option>
                          <option value="3">Admin</option>
                          <option value="4">Customer</option>
                        </select>
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="form_subject"
                          placeholder="Employee password"
                          required
                          value={employee_password}
                          onChange={(e) => setEmployeePassword(e.target.value)}
                        />
                        {passwordError && (
                          <div className={classes.error__message} role="alert">
                            {passwordError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          id="form_botcheck"
                          name="form_botcheck"
                          className="form-control"
                          type="hidden"
                        />
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          {loading ? (
                            <span>Please Wait...</span>
                          ) : (
                            <span>add employee</span>
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

export default AddEmployeeForm;
