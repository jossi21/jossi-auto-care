import React, { useState, useEffect } from "react";
import classes from "../Customer/CustomerProfile.module.css";
import VehicleService from "../../../../services/vehicle.service";
import { useNavigate, useParams } from "react-router";

const EditVehicle = () => {
  const { id } = useParams();
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

  const [successResponse, setSuccessResponse] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputErr, setInputErr] = useState("");

  useEffect(() => {
    const fetchVehicleData = async () => {
      setIsLoading(true);
      try {
        const response = await VehicleService.getVehicle(id);
        const data = await response.json();

        console.log("Fetched vehicle data:", data);

        if (data.data) {
          setVehicles({
            customer_id: data.data.customer_id || "",
            vehicle_year: data.data.vehicle_year || "",
            vehicle_make: data.data.vehicle_make || "",
            vehicle_model: data.data.vehicle_model || "",
            vehicle_type: data.data.vehicle_type || "",
            vehicle_mileage: data.data.vehicle_mileage || "",
            vehicle_tag: data.data.vehicle_tag || "",
            vehicle_serial: data.data.vehicle_serial || "",
            vehicle_color: data.data.vehicle_color || "",
          });
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        setServerError("Failed to load vehicle data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVehicleData();
    }
  }, [id]);

  //  value for all inputs
  // And fix the first input (it had defaultValue instead of value)

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
      vehicle_id: id,
      vehicle_year: vehicles.vehicle_year,
      vehicle_make: vehicles.vehicle_make,
      vehicle_model: vehicles.vehicle_model,
      vehicle_type: vehicles.vehicle_type,
      vehicle_mileage: vehicles.vehicle_mileage,
      vehicle_tag: vehicles.vehicle_tag,
      vehicle_serial: vehicles.vehicle_serial,
      vehicle_color: vehicles.vehicle_color,
    };

    console.log(vehicleData);
    setIsLoading(true);

    VehicleService.updateVehicle(vehicleData)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error || "Please try again");
          setIsLoading(false);
        } else {
          setSuccessResponse(data.message || "Vehicle updated successfully");
          setServerError("");
          setTimeout(() => {
            navigate(-1);
            setSuccessResponse("");
            setIsLoading(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        setServerError(error.message || "Something went wrong");
        setIsLoading(false);
      });
  };

  return (
    <>
      <section className={`contact-section ${classes.form__section}`}>
        <div className="auto-container">
          <div className="contact-title">
            <h2>Edit Vehicle</h2>{" "}
          </div>
          <div className="row clearfix">
            <div className="form-column col-lg-12">
              <div className="inner-column">
                <div className={classes.addVehicle_form}>
                  <form onSubmit={handleAddVehicle}>
                    {serverError && (
                      <div className={classes.server__error__message}>
                        {serverError}
                      </div>
                    )}
                    {successResponse && (
                      <div className={classes.success__response__message}>
                        {successResponse}
                      </div>
                    )}

                    <div className="row clearfix">
                      {/* vehicle year input  */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_year"
                          placeholder="vehicle year"
                          className={inputErr ? classes.input__error : ""}
                          value={vehicles?.vehicle_year || ""}
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

                      {/* Rest of your inputs are correct (they use value) */}
                      {/* vehicle make input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="make"
                          placeholder="vehicle make"
                          value={vehicles?.vehicle_make || ""}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_make: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* vehicle model input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="model"
                          placeholder="vehicle model"
                          value={vehicles?.vehicle_model || ""}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_model: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* vehicle type input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="type"
                          placeholder="vehicle type"
                          value={vehicles?.vehicle_type || ""}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_type: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* vehicle mileage input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="mileage"
                          placeholder="vehicle mileage"
                          value={vehicles?.vehicle_mileage || ""}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_mileage: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* vehicle tag input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="tag"
                          placeholder="vehicle tag"
                          value={vehicles?.vehicle_tag || ""}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_tag: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* vehicle serial input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="serial"
                          placeholder="vehicle serial"
                          value={vehicles?.vehicle_serial || ""}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_serial: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* vehicle color input */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="color"
                          placeholder="vehicle color"
                          value={vehicles?.vehicle_color || ""}
                          onChange={(e) =>
                            setVehicles({
                              ...vehicles,
                              vehicle_color: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                        >
                          {isLoading ? (
                            <span>Please wait...</span>
                          ) : (
                            <span>Update vehicle</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditVehicle;
