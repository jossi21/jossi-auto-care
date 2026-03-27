import React, { use, useState } from "react";
import classes from "./AddEmployee.module.css";
import employeeService from "../../../pages/Admin/services/employee.servicce";

const AddEmployeeForm = () => {
  // define states that holed the input values
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_first_name, setEmployeeFirstName] = useState("");
  const [employee_last_name, setEmployeeLastName] = useState("");
  const [employee_phone, setEmployeePhone] = useState("");
  const [employee_password, setEmployeePassword] = useState("");
  const [active_employee, setActiveEmployee] = useState(1);
  const [company_role_id, setCompanyRoleID] = useState("");

  // error handler states
  const [emailErr, setEmailErr] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [phoneNumErr, setPhoneNumErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [companyRoleErr, setCompanyRoleErr] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // the function handle the submission process
  const addEmployeeHandler = (e) => {
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

    // first name validation
    if (!employee_first_name) {
      setFirstNameErr("First name required");
      flag = false;
    } else if (employee_first_name.length < 3) {
      setFirstNameErr("The name must be more than 3 char");
      flag = false;
    } else {
      setFirstNameErr("");
    }
    // first name validation
    if (!employee_last_name) {
      setLastNameErr("Last name required");
      flag = false;
    } else {
      setLastNameErr("");
    }

    // Phone number validation
    const phoneRegex = /^(09|\+2519)\d{8}$/;
    if (!employee_phone) {
      setPhoneNumErr("Phone number required");
      flag = false;
    } else if (typeof employee_email !== "string") {
      setPhoneNumErr("Phone number must be number");
      flag = false;
    } else if (!phoneRegex.test(employee_phone)) {
      setPhoneNumErr("Use format: 09xxxxxxxx or +2519xxxxxxxx");
      flag = false;
    } else {
      setPhoneNumErr("");
    }

    // company role validation
    if (!company_role_id) {
      setCompanyRoleErr("Please select employee role");
      flag = false;
    } else {
      setCompanyRoleErr("");
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
      employee_first_name,
      employee_last_name,
      employee_phone,
      company_role_id: parseInt(company_role_id),
      employee_password,
      active_employee: 1,
    };

    // console.log(formData);

    const newEmployee = employeeService.addNewEmployee(formData);
    setLoading(true);
    newEmployee
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setServerError(data.error);
          setLoading(false);
        } else {
          setSuccessResponse(data.success);
          setServerError("");
          // set time out and redirect to home page
          setTimeout(() => {
            window.location.href = "/";
            setSuccessResponse("");
            setLoading(false);
          }, 2000);
        }
      })

      .catch((error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setTimeout(() => {
          setServerError(errorMessage);
        }, 3000);
        setServerError("");
        setLoading(false);
      });
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
                    {serverError ? (
                      <div className={classes.server__error__message}>
                        {serverError}
                      </div>
                    ) : (
                      <div className={classes.success__response__message}>
                        {successResponse}
                      </div>
                    )}
                    <div className="row clearfix">
                      {/* email input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="email"
                          placeholder="Your Email"
                          className={emailErr ? classes.input__error : ""}
                          value={employee_email}
                          onChange={(e) => setEmployeeEmail(e.target.value)}
                        />
                        {emailErr && (
                          <div className={classes.error__message}>
                            {emailErr}
                          </div>
                        )}
                      </div>
                      {/* first name input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="first-name"
                          placeholder="Employee first name"
                          className={firstNameErr ? classes.input__error : ""}
                          value={employee_first_name}
                          onChange={(e) => setEmployeeFirstName(e.target.value)}
                        />
                        {firstNameErr && (
                          <div className={classes.error__message}>
                            {firstNameErr}
                          </div>
                        )}
                      </div>
                      {/* last name input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="last-name"
                          placeholder="Employee last name"
                          className={lastNameErr ? classes.input__error : ""}
                          value={employee_last_name}
                          onChange={(e) => setEmployeeLastName(e.target.value)}
                        />
                        {lastNameErr && (
                          <div className={classes.error__message}>
                            {lastNameErr}
                          </div>
                        )}
                      </div>

                      {/* phone number inputs */}
                      <div className="form-group col-md-12">
                        <input
                          type="tel"
                          name="phone-number"
                          placeholder="Employee phone "
                          className={phoneNumErr ? classes.input__error : ""}
                          value={employee_phone}
                          onChange={(e) => setEmployeePhone(e.target.value)}
                        />
                        {phoneNumErr && (
                          <div className={classes.error__message}>
                            {phoneNumErr}
                          </div>
                        )}
                      </div>
                      {/* role input  */}
                      <div className={` form-group col-md-12 `}>
                        <select
                          name="role"
                          className={`col-md-12 py-2 px-1 ${classes.add_employee_role}`}
                          value={company_role_id}
                          onChange={(e) => setCompanyRoleID(e.target.value)}
                        >
                          <option value="">Select a role</option>
                          <option value="1">Employee</option>
                          <option value="2">Manager</option>
                          <option value="3">Admin</option>
                          <option value="4">Customer</option>
                        </select>
                        {companyRoleErr && (
                          <div className={classes.error__message}>
                            {companyRoleErr}
                          </div>
                        )}
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="form_subject"
                          placeholder="Employee password"
                          className={passwordErr ? classes.input__error : ""}
                          value={employee_password}
                          onChange={(e) => setEmployeePassword(e.target.value)}
                        />
                        {passwordErr && (
                          <div className={classes.error__message}>
                            {passwordErr}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          {" "}
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
