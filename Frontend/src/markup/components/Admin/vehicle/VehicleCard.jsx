import React, { useState } from "react";
import classes from "../Customer/CustomerProfile.module.css";
import { FaAngleDown, FaAngleUp, FaArrowDown, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

const VehicleCard = ({ vehicles }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  //   console.log(vehicles.vehicle_year);
  return (
    <div className="d-flex flex-column">
      <button
        className="mb-4 p-1"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "#87CEEB",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <span className="py-4 px-2 fs-5 fw-bold">
          {isOpen ? "Hide" : "Show"} car info
        </span>
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {isOpen && (
        <section className={`services-section ${classes.car_info_section}`}>
          <div className="sec-title style-two">
            <div className="row">
              {vehicles?.map((vehicle) => (
                <div
                  className="col-lg-6 service-block-one"
                  key={vehicle.vehicle_id}
                >
                  <div className="inner-box hvr-float-shadow">
                    <div>
                      <h4
                        className={`mb-3 ${classes.customer__name} fw-bolder`}
                      >
                        Model: {vehicle?.vehicle_model}
                      </h4>
                    </div>
                    <div className="d-flex justify-content-around align-items-start mb-3">
                      <div>
                        <div>
                          <span className="fw-bold pr-1">Year:</span>{" "}
                          {vehicle?.vehicle_year}
                        </div>
                        <div>
                          <span className="fw-bold pr-1"> Make:</span>{" "}
                          {vehicle?.vehicle_make}
                        </div>
                        <div>
                          <span className="fw-bold pr-1"> Model:</span>{" "}
                          {vehicle?.vehicle_model}
                        </div>
                        <div>
                          <span className="fw-bold pr-1"> Type:</span>{" "}
                          {vehicle?.vehicle_type}
                        </div>
                      </div>
                      <div>
                        <div>
                          <span className="fw-bold pr-1"> Mileage:</span>{" "}
                          {vehicle?.vehicle_mileage}
                        </div>
                        <div>
                          <span className="fw-bold pr-1"> Tag:</span>{" "}
                          {vehicle?.vehicle_tag}
                        </div>
                        <div>
                          <span className="fw-bold pr-1"> Serial:</span>{" "}
                          {vehicle?.vehicle_serial}
                        </div>
                        <div>
                          <span className="fw-bold pr-1"> Color:</span>{" "}
                          {vehicle?.vehicle_color}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="fw-bold pr-1 ">
                        Edit vehicle info:{" "}
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/customer/profile/edit/${vehicle?.vehicle_id}`,
                            )
                          }
                          style={{
                            background: "none",
                          }}
                        >
                          <FaEdit size={15} color="red" />
                        </button>
                      </span>
                    </div>
                    <div className="icon">
                      <span className="flaticon-car"></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default VehicleCard;
