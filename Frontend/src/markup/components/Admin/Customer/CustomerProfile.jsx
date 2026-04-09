import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import VehicleService from "../../../../services/vehicle.service";
import { useState } from "react";
import classes from "./CustomerProfile.module.css";
import { FaEdit, FaTimes } from "react-icons/fa";
import customerService from "../../../../services/customer.services";
import AddVehicleForm from "../vehicle/AddVehicleForm";
import VehicleCard from "../vehicle/VehicleCard";
import Spinner from "../../Spinner";

const CustomerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // console.log(vehicles);
  // toggler effect
  const [isShow, setIsShow] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer
        const customerResponse = await customerService.singleCustomer(id);
        if (!customerResponse.ok) {
          throw new Error(
            `Failed to fetch customer: ${customerResponse.status}`,
          );
        }
        const customerData = await customerResponse.json();
        if (customerData.data && customerData.data.length > 0) {
          setCustomer(customerData.data[0]);
        }

        // Fetch vehicles
        const vehicleResponse = await VehicleService.getVehicle(id);
        if (!vehicleResponse.ok) {
          throw new Error(
            `Failed to fetch vehicles: ${vehicleResponse.status}`,
          );
        }
        const vehicleData = await vehicleResponse.json();
        if (vehicleData.data && vehicleData.data.length > 0) {
          setVehicles(vehicleData.data);
        }
      } catch (err) {
        setServerError(err.message || "Something went wrong");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      setLoading(true);
      fetchData();
    }
  }, [id]);

  return (
    <>
      <section className={`my-5 mx-3 `}>
        <div className={`${classes.customer__profile}`}></div>
        <div className="d-flex ">
          <div className={`${classes.customer__info_div}`}>
            <h3 className="text-white">Info</h3>
          </div>
          <div>
            <div>
              <h4 className={`mb-3 ${classes.customer__name} fw-bolder`}>
                Customer: {customer?.customer_first_name}{" "}
                {customer?.customer_last_name}
              </h4>
            </div>
            <div>
              <div>
                <span className="fw-bold pr-1">Email:</span>{" "}
                {customer?.customer_email}
              </div>
              <div>
                <span className="fw-bold pr-1">Phone number:</span>{" "}
                {customer?.customer_phone_number}
              </div>
              <div>
                <span className="fw-bold pr-1">Active customer:</span>{" "}
                {customer?.active_customer_status ? "Yes" : "No"}
              </div>
              <div>
                <span className="fw-bold pr-1 ">
                  Edit customer info:{" "}
                  <button
                    onClick={() =>
                      navigate(`/admin/customers/${customer?.customer_id}`)
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
        </div>

        <div className="d-flex mb-5">
          <div className={`${classes.customer__cars_div}`}>
            <h3 className="text-white">Cars</h3>
          </div>
          <div className="flex-grow-1 px-3">
            <div>
              <h4 className={`mb-3 ${classes.customer__name} fw-bolder`}>
                Vehicle of {customer?.customer_first_name}
              </h4>
            </div>
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="w-95 mx-auto">
                {vehicles?.length > 0 ? (
                  <VehicleCard vehicles={vehicles} />
                ) : (
                  <div className={`p-2 ${classes.vehicle__not_found}  mb-5`}>
                    <span>No vehicle found</span>
                  </div>
                )}
                <div className="form-group col-md-12">
                  {!isShow ? (
                    <button
                      onClick={() => setIsShow(true)}
                      className="theme-btn btn-style-one"
                    >
                      <span>add vehicle</span>
                    </button>
                  ) : (
                    <div className={`${classes.add__vehicle__section}`}>
                      <button
                        onClick={() => setIsShow(false)}
                        className={`${classes.remove__form__icon}`}
                        style={{
                          background: "none",
                        }}
                      >
                        <FaTimes color="red" size={20} />
                      </button>
                      <AddVehicleForm />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex">
          <div className={`${classes.customer__orders_div}`}>
            <h3 className="text-white">Orders</h3>
          </div>
          <div></div>
        </div>
      </section>
    </>
  );
};

export default CustomerProfile;
