import React, { useState } from "react";
import classes from "../../../../assets/styles/custom.module.css";
const AdditionalRequest = ({ onFinalSubmit, loading }) => {
  const [service_description, setServiceDesc] = useState("");
  const [price, setPrice] = useState("");
  const [serviceDescErr, setServiceDescErr] = useState("");
  const [priceErr, setPriceErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let flag = true;

    if (!service_description) {
      setServiceDescErr("Order description required");
      flag = false;
    } else {
      setServiceDescErr("");
    }

    if (!price) {
      setPriceErr("Price is required");
      flag = false;
    } else {
      setPriceErr("");
    }

    if (!flag) {
      return;
    }

    onFinalSubmit({ service_description, price });
  };

  return (
    <section className={`mt-5 ${classes.custom_bg_section}`}>
      <div
        className={`contact-section pt-5 ${classes.employee__outer__wrapper}`}
      >
        <div className="auto-container">
          <div className={`contact-title ${classes.addEmployee_title}`}>
            <h2>Additional Requests</h2>
          </div>
          <div className="row clearfix">
            <div className="form-column">
              <div className="inner-column">
                <div className={classes.addEmployee_form}>
                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      {/* Order Description Textarea */}
                      <div className="form-group col-md-12">
                        <textarea
                          name="service_description"
                          placeholder="Order Description"
                          className={serviceDescErr ? classes.input__error : ""}
                          rows="4"
                          value={service_description}
                          onChange={(e) => setServiceDesc(e.target.value)}
                        />
                        {serviceDescErr && (
                          <div className={classes.error__message}>
                            {serviceDescErr}
                          </div>
                        )}
                      </div>

                      {/* Price Input */}
                      <div className="form-group col-md-12">
                        <input
                          type="number"
                          name="price"
                          placeholder="Total Price"
                          className={priceErr ? classes.input__error : ""}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        {priceErr && (
                          <div className={classes.error__message}>
                            {priceErr}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="form-group col-md-12">
                        <button
                          disabled={loading}
                          className="theme-btn btn-style-one"
                          type="submit"
                        >
                          {loading ? "Submitting..." : "Submit Order"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalRequest;
