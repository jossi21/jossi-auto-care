import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import classes from "../Customer/CustomerProfile.module.css";
import { FaEdit, FaTimes } from "react-icons/fa";
import Spinner from "../../Spinner";
import VehicleService from "../../../../services/vehicle.service";

const VehicleCard = ({ vehicle_id }) => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // console.log("vehicle_id:", vehicle_id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vehicles
        const vehicleResponse =
          await VehicleService.getVehicleByVehicleId(vehicle_id);
        if (!vehicleResponse.ok) {
          throw new Error(
            `Failed to fetch vehicles: ${vehicleResponse.status}`,
          );
        }
        const vehicleData = await vehicleResponse.json();
        if (vehicleData.data && vehicleData.data.length > 0) {
          // console.log(vehicleData);
          setVehicles(vehicleData.data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (vehicle_id) {
      setLoading(true);
      fetchData();
    }
  }, [vehicle_id]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* customer vehicle card */}
          <div className={`row ${classes.service__order__bg} mt-5`}>
            <div className=" service-block-one">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  padding: "8px",
                }}
              >
                <div>
                  <div>
                    <h4 className={`${classes.customer__name} fw-bolder`}>
                      {vehicles?.vehicle_make} {vehicles?.vehicle_model}
                    </h4>
                  </div>
                  <div>
                    <div>
                      <span className="fw-bold pr-1">Vehicle color:</span>{" "}
                      {vehicles?.vehicle_color}
                    </div>
                    <div>
                      <span className="fw-bold pr-1">Vehicle tag:</span>{" "}
                      {vehicles?.vehicle_tag}
                    </div>
                    <div>
                      <span className="fw-bold pr-1">Vehicle year:</span>{" "}
                      {vehicles?.vehicle_year}
                    </div>
                    <div>
                      <span className="fw-bold pr-1">Vehicle mileage:</span>{" "}
                      {vehicles?.vehicle_mileage}
                    </div>
                    <div>
                      <span className="fw-bold pr-1">Vehicle serial:</span>{" "}
                      {vehicles?.vehicle_serial}
                    </div>
                    <div>
                      <span className="fw-bold pr-1 ">
                        Edit vehicle info:{" "}
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/customers/${customers?.customer_id}`,
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
                  </div>
                </div>
                <div className="d-flex gap-2 " style={{ width: "40px" }}>
                  <button
                    className="btn btn-link p-0"
                    style={{ background: "none", border: "none" }}
                  >
                    <FaTimes size={15} color="red" />
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleCard;
