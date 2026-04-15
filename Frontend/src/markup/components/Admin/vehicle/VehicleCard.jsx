import React from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Table } from "react-bootstrap";

const VehicleCard = ({ vehicles = [] }) => {
  const navigate = useNavigate();

  //   console.log(vehicles.vehicle_year);
  return (
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
                          `/admin/customer/profile/edit/${vehicle.vehicle_id}`,
                        )
                      }
                      style={{
                        background: "none",
                      }}
                    >
                      <FaEdit size={15} />
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
    </>
  );
};

export default VehicleCard;
