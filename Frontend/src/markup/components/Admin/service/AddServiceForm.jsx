import React, { useState } from "react";
import classes from "../../../../../src/assets/styles/custom.module.css";
import serviceService from "../../../../services/service.service";
import { useNavigate } from "react-router";

const AddServiceForm = () => {
  const navigate = useNavigate();
  // define states that holed the input values
  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDesc] = useState("");

  // error handler states
  const [serviceNameErr, setServiceNameErr] = useState("");
  const [serviceDescErr, setServiceDescErr] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // the function handle the submission process
  const addServiceHandler = (e) => {
    // prevent default behavior of the browser
    e.preventDefault();

    // Here is the validation process
    let flag = true;

    // email validation
    if (!service_name) {
      setServiceNameErr("service name required");
      flag = false;
    } else {
      setServiceNameErr("");
    }

    // first name validation
    if (!service_description) {
      setServiceDescErr("service description required");
      flag = false;
    } else {
      setServiceDescErr("");
    }

    if (!flag) {
      return;
    }
    const serviceData = {
      service_name,
      service_description,
    };

    // console.log(serviceData);

    const newService = serviceService.addService(serviceData);
    setLoading(true);
    newService
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setServerError(data.error);
          setLoading(false);
        } else {
          setSuccessResponse(data.message);
          setServerError("");
          // set time out and redirect to home page
          setTimeout(() => {
            navigate(0);
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
      <section
        className={`col-lg-10 mx-auto mt-5 ${classes.custom_bg_section}`}
      >
        <div
          className={`contact-section pt-5 ${classes.employee__outer__wrapper}`}
        >
          <div className="auto-container">
            <div className={`contact-title ${classes.addEmployee_title}`}>
              <h2>Add a new service</h2>
            </div>
            <div className="row clearfix">
              {/* <!--Form Column--> */}
              <div className="form-column">
                <div className="inner-column">
                  {/* <!--Contact Form--> */}
                  <div className={classes.addEmployee_form}>
                    <form
                      method="post"
                      id="contact-form"
                      onSubmit={addServiceHandler}
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
                            name="service_name"
                            placeholder="Service name"
                            className={
                              serviceNameErr ? classes.input__error : ""
                            }
                            value={service_name}
                            onChange={(e) => setServiceName(e.target.value)}
                          />
                          {serviceNameErr && (
                            <div className={classes.error__message}>
                              {serviceNameErr}
                            </div>
                          )}
                        </div>
                        {/* first name input */}
                        <div className="form-group col-md-12">
                          <textarea
                            type="text"
                            name="service_description"
                            placeholder="Service description"
                            className={
                              serviceDescErr ? classes.input__error : ""
                            }
                            value={service_description}
                            onChange={(e) => setServiceDesc(e.target.value)}
                          />
                          {serviceDescErr && (
                            <div className={classes.error__message}>
                              {serviceDescErr}
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
                              <span>Add service</span>
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
        </div>
      </section>
    </>
  );
};

export default AddServiceForm;
