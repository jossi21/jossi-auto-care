import React, { use, useState } from "react";
import classes from "../../../../../src/assets/styles/custom.module.css";
import customerService from "../../../../services/customer.services";
import { useLocation, useNavigate } from "react-router";

const AddCustomerForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // check where the user comes from
  const isEmbedded = location.state?.embedded === true;
  const returnPath = location.state?.from || "/admin/customers";
  // define states that holed the input values
  const [customer_email, setCustomerEmail] = useState("");
  const [customer_first_name, setCustomerFirstName] = useState("");
  const [customer_last_name, setCustomerLastName] = useState("");
  const [customer_phone_number, setCustomerPhone] = useState("");
  const [active_customer_status, setActiveCustomer] = useState(1);

  // error handler states
  const [emailErr, setEmailErr] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [phoneNumErr, setPhoneNumErr] = useState("");
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
    if (!customer_email) {
      setEmailErr("email address required");
      flag = false;
    } else if (!emailRegex.test(customer_email)) {
      setEmailErr("Allowed email (example@gmail.com)");
      flag = false;
    } else {
      setEmailErr("");
    }

    // first name validation
    if (!customer_first_name) {
      setFirstNameErr("First name required");
      flag = false;
    } else if (customer_first_name.length < 3) {
      setFirstNameErr("The name must be more than 3 char");
      flag = false;
    } else {
      setFirstNameErr("");
    }
    // first name validation
    if (!customer_last_name) {
      setLastNameErr("Last name required");
      flag = false;
    } else {
      setLastNameErr("");
    }

    // Phone number validation
    const phoneRegex = /^(09|\+2519)\d{8}$/;
    if (!customer_phone_number) {
      setPhoneNumErr("Phone number required");
      flag = false;
    } else if (typeof customer_email !== "string") {
      setPhoneNumErr("Phone number must be number");
      flag = false;
    } else if (!phoneRegex.test(customer_phone_number)) {
      setPhoneNumErr("Use format: 09xxxxxxxx or +2519xxxxxxxx");
      flag = false;
    } else {
      setPhoneNumErr("");
    }
    if (!flag) {
      return;
    }
    const customerData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    };

    // console.log(customerData);

    // get the response data from the backend
    const newCustomer = customerService.addCustomer(customerData);
    setLoading(true);
    // console.log(newCustomer);
    newCustomer
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
          setLoading(false);
        } else {
          (setSuccessResponse(data.message), setServerError(""));
          setLoading(false);
          // Navigate based on how it was opened
          if (isEmbedded) {
            navigate(-1);
          } else {
            navigate(returnPath);
          }
        }
      })
      .catch((error) => {
        setServerError(error.error);
        setSuccessResponse("");
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
            <h2>Add a new customer</h2>
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
                          value={customer_email}
                          onChange={(e) => setCustomerEmail(e.target.value)}
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
                          value={customer_first_name}
                          onChange={(e) => setCustomerFirstName(e.target.value)}
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
                          value={customer_last_name}
                          onChange={(e) => setCustomerLastName(e.target.value)}
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
                          value={customer_phone_number}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                        {phoneNumErr && (
                          <div className={classes.error__message}>
                            {phoneNumErr}
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
                            <span>add Customer</span>
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

export default AddCustomerForm;
