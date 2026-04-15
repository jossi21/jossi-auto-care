import React, { useState } from "react";
import classes from "../Customer/CustomerProfile.module.css";
import VehicleService from "../../../../services/vehicle.service";
import { useNavigate } from "react-router";

const AddVehicleForm = ({ customerId }) => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState({
    customer_id: "",
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });

  // console.log(vehicles);
  // toggler effect

  const [successResponse, setSuccessResponse] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputErr, setInputErr] = useState("");
  // the function handle the submission process
  const handleAddVehicle = (e) => {
    e.preventDefault();

    let flag = true;

    if (!vehicles.vehicle_year) {
      setInputErr("Vehicle data required");
      flag = false;
    } else {
      setInputErr("");
    }

    if (!flag) {
      return;
    }

    const vehicleData = {
      customer_id: customerId,
      vehicle_year: vehicles.vehicle_year,
      vehicle_make: vehicles.vehicle_make,
      vehicle_model: vehicles.vehicle_model,
      vehicle_type: vehicles.vehicle_type,
      vehicle_mileage: vehicles.vehicle_mileage,
      vehicle_tag: vehicles.vehicle_tag,
      vehicle_serial: vehicles.vehicle_serial,
      vehicle_color: vehicles.vehicle_color,
    };

    console.log("Sending:", vehicleData);

    setIsLoading(true);

    VehicleService.addVehicle(vehicleData)
      .then(async (res) => {
        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Response data:", data);

        if (res.ok) {
          // Success
          setSuccessResponse(data.message || "Vehicle added successfully");
          setServerError("");

          // Reset form
          setVehicles({
            customer_id: "",
            vehicle_year: "",
            vehicle_make: "",
            vehicle_model: "",
            vehicle_type: "",
            vehicle_mileage: "",
            vehicle_tag: "",
            vehicle_serial: "",
            vehicle_color: "",
          });

          setTimeout(() => {
            navigate(0); // Refresh page
            setSuccessResponse("");
            setIsLoading(false);
          }, 2000);
        } else {
          //  Error
          setServerError(data.error || "Something went wrong");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        setServerError(error.message || "Something went wrong");
        setIsLoading(false);
      });
  };
  return (
    <>
      <section className={`contact-section ${classes.form__section}`}>
        <div className="auto-container">
          <div className="contact-title">
            <h2>Add Vehicle</h2>
          </div>
          <div className="row clearfix">
            {/* <!--Form Column--> */}
            <div className="form-column col-lg-12">
              <div className="inner-column">
                {/* <!--Contact Form--> */}
                <div className={classes.addVehicle_form}>
                  <form
                    method="post"
                    id="contact-form"
                    onSubmit={handleAddVehicle}
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
                      {/* vehicle year input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="email"
                          placeholder="vehicle year"
                          className={inputErr ? classes.input__error : ""}
                          value={vehicles?.vehicle_year}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_year: e.target.value,
                            })
                          }
                        />
                        {inputErr && (
                          <div className={classes.error__message}>
                            {inputErr}
                          </div>
                        )}
                      </div>
                      {/* vehicle make input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="make"
                          placeholder="vehicle make"
                          className={inputErr ? classes.input__error : ""}
                          value={vehicles?.vehicle_make}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_make: e.target.value,
                            })
                          }
                        />
                        {inputErr && (
                          <div className={classes.error__message}>
                            {inputErr}
                          </div>
                        )}
                      </div>
                      {/* vehicle model input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="model"
                          placeholder="vehicle model"
                          className={inputErr ? classes.input__error : ""}
                          value={vehicles?.vehicle_model}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_model: e.target.value,
                            })
                          }
                        />
                        {inputErr && (
                          <div className={classes.error__message}>
                            {inputErr}
                          </div>
                        )}
                      </div>
                      {/* vehicle type input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="type"
                          placeholder="vehicle type"
                          className={inputErr ? classes.input__error : ""}
                          value={vehicles?.vehicle_type}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_type: e.target.value,
                            })
                          }
                        />
                        {inputErr && (
                          <div className={classes.error__message}>
                            {inputErr}
                          </div>
                        )}
                      </div>
                      {/* vehicle mileage input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="mileage"
                          placeholder="vehicle mileage"
                          className={inputErr ? classes.input__error : ""}
                          value={vehicles?.vehicle_mileage}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_mileage: e.target.value,
                            })
                          }
                        />
                        {inputErr && (
                          <div className={classes.error__message}>
                            {inputErr}
                          </div>
                        )}
                      </div>
                      {/* vehicle tag input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="tag"
                          placeholder="vehicle tag"
                          className={inputErr ? classes.input__error : ""}
                          value={vehicles?.vehicle_tag}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_tag: e.target.value,
                            })
                          }
                        />
                        {inputErr && (
                          <div className={classes.error__message}>
                            {inputErr}
                          </div>
                        )}
                      </div>
                      {/* vehicle serial input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="serial"
                          placeholder="vehicle serial"
                          className={inputErr ? classes.input__error : ""}
                          value={vehicles?.vehicle_serial}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_serial: e.target.value,
                            })
                          }
                        />
                        {inputErr && (
                          <div className={classes.error__message}>
                            {inputErr}
                          </div>
                        )}
                      </div>
                      {/* vehicle color input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="color"
                          placeholder="vehicle color"
                          className={inputErr ? classes.input__error : ""}
                          value={vehicles?.vehicle_color}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_color: e.target.value,
                            })
                          }
                        />
                        {inputErr && (
                          <div className={classes.error__message}>
                            {inputErr}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                        >
                          {isLoading ? (
                            <span>Please wait...</span>
                          ) : (
                            <span>add Vehicle</span>
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

export default AddVehicleForm;
