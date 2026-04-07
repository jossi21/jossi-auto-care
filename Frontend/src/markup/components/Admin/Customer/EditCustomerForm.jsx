import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import customerService from "../../../../services/customer.services";
import classes from "../../../../../src/assets/styles/custom.module.css";

const EditCustomerForm = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  // define states that holed the input values
  const [customer, setCustomer] = useState([]);
  const [customer_first_name, setCustomerFirstName] = useState("");
  const [customer_last_name, setCustomerLastName] = useState("");
  const [customer_phone_number, setCustomerPhone] = useState("");
  const [isActive, setIsActive] = useState("0");
  // console.log(customer);

  // error handler states
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [phoneNumErr, setPhoneNumErr] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  // the function handle the submission process
  const UpdateCustomerHandler = (e) => {
    // prevent default behavior of the browser
    e.preventDefault();

    // Here is the validation process
    let flag = true;

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
    } else if (typeof customer_phone_number !== "string") {
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

    const updateData = {
      customer_id: customer.customer_id,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status: isActive,
    };

    const updatedCustomer = customerService.updateCustomerData(updateData);

    // console.log(updatedCustomer);
    setLoading(true);
    updatedCustomer
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (!data) {
          setServerError(data.error);
          setLoading(false);
        } else {
          setSuccessResponse(data.message);
          setServerError("");
          setTimeout(() => {
            navigate("/admin/customers");
            setSuccessResponse("");
            setLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setServerError(err.error || err.message || "Something went wrong");
      });
  };
  // const singleCustomer = customerService.singleCustomer(id);
  // console.log(singleCustomer);
  useEffect(() => {
    customerService
      .singleCustomer(id)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setCustomer(data.data[0]);
        } else {
          setServerError("Customer not found");
        }
      })
      .catch((err) => setServerError(err.message || "Something went wrong"));
  }, [id]);

  return (
    <>
      {/* <!--login Section--> */}
      <section
        className={`contact-section ${classes.employee__outer__wrapper}`}
      >
        <div className="auto-container">
          <div className={`contact-title ${classes.addEmployee_title}`}>
            <h2>
              Edit : <span>{customer?.customer_first_name}</span>{" "}
              <span>{customer?.customer_last_name}</span>
            </h2>
          </div>
          <div className="row clearfix">
            {/* <!--Form Column--> */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <h6 className="pt-3 fw-bold">
                  Employee Email: {customer?.customer_email}
                </h6>
                {/* <!--Contact Form--> */}
                <div className={classes.addEmployee_form}>
                  <form
                    method="post"
                    id="contact-form"
                    onSubmit={UpdateCustomerHandler}
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
                      {/* first name input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="first-name"
                          placeholder="Customer first name"
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
                          placeholder="Customer last name"
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
                      {/* status div */}
                      <div className="d-flex align-items-center gap-2 mb-3 ml-4 ">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={isActive === "1"}
                          onChange={(e) =>
                            setIsActive(e.target.checked ? "1" : "0")
                          }
                          style={{
                            width: "16px",
                            height: "16px",
                            cursor: "pointer",
                          }}
                        />
                        <span className="form-check-label fw-medium">
                          active customer
                        </span>
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
                            <span>Update</span>
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

export default EditCustomerForm;
