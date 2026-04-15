import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import classes from "../Customer/CustomerProfile.module.css";
import { FaEdit, FaHandPointer } from "react-icons/fa";
import { Table } from "react-bootstrap";
import Spinner from "../../Spinner";
import AddVehicleForm from "../vehicle/AddVehicleForm";
import VehicleService from "../../../../services/vehicle.service";

const VehicleTableCard = () => {
  const { customer_id } = useParams();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vehicles
        const vehicleResponse = await VehicleService.getVehicle(customer_id);
        if (!vehicleResponse.ok) {
          throw new Error(
            `Failed to fetch vehicles: ${vehicleResponse.status}`,
          );
        }
        const vehicleData = await vehicleResponse.json();
        if (vehicleData.data && vehicleData.data.length > 0) {
          // console.log(vehicleData);
          setVehicles(vehicleData.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (customer_id) {
      setLoading(true);
      fetchData();
    }
  }, [customer_id]);
  return (
    <>
      {/* customer vehicle card */}
      <div className={`row ${classes.custom_bg_section} mt-3`}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Spinner isLoading={isLoading} />{" "}
            <span style={{ marginTop: "10px", fontWeight: "bold" }}>
              Loading customer vehicles...
            </span>
          </div>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Tag</th>
                  <th>Serial</th>
                  <th>color</th>
                  <th>Mileage</th>
                  <th>Choose</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <tr key={vehicle.vehicle_id}>
                      <td>{vehicle.vehicle_year}</td>
                      <td>{vehicle.vehicle_make}</td>
                      <td>{vehicle.vehicle_model}</td>
                      <td>{vehicle.vehicle_tag}</td>
                      <td>{vehicle.vehicle_serial}</td>
                      <td>{vehicle.vehicle_color}</td>
                      <td>{vehicle.vehicle_mileage}</td>
                      <td>
                        <div
                          style={{
                            alignItems: "center",
                            background: "none",
                            display: "flex",
                            flexDirection: "row",
                            gap: "4px",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/orders/${customer_id}/services/${vehicle.vehicle_id}`,
                              )
                            }
                            style={{ background: "none" }}
                          >
                            <FaHandPointer size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      NO customer vehicle found matching
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="form-group col-md-12">
              <button
                onClick={() =>
                  navigate(`/admin/customer/profile/${customer_id}`)
                }
                className="theme-btn btn-style-one"
                type="submit"
                data-loading-text="Please wait..."
              >
                Add vehicle
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VehicleTableCard;
