import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import classes from "../Customer/CustomerProfile.module.css";
import { FaEdit, FaTimes } from "react-icons/fa";
import Spinner from "../../Spinner";
import customerService from "../../../../services/customer.services";

const CustomerCard = ({ customer_id }) => {
  const navigate = useNavigate();
  const [customers, setCustomer] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // console.log(customer_id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer
        const customerResponse =
          await customerService.singleCustomer(customer_id);
        if (!customerResponse.ok) {
          throw new Error(
            `Failed to fetch customer: ${customerResponse.status}`,
          );
        }
        const customerData = await customerResponse.json();
        if (customerData.data && customerData.data.length > 0) {
          setCustomer(customerData.data[0]);
          // console.log(customerData.data);
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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={`row ${classes.service__order__bg} pb-3`}>
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
                    {customers?.customer_first_name}{" "}
                    {customers?.customer_last_name}
                  </h4>
                </div>
                <div>
                  <div>
                    <span className="fw-bold pr-1">Email:</span>{" "}
                    {customers?.customer_email}
                  </div>
                  <div>
                    <span className="fw-bold pr-1">Phone number:</span>{" "}
                    {customers?.customer_phone_number}
                  </div>
                  <div>
                    <span className="fw-bold pr-1">Active customers:</span>{" "}
                    {customers?.active_customer_status ? "Yes" : "No"}
                  </div>
                  <div>
                    <span className="fw-bold pr-1 ">
                      Edit customers info:{" "}
                      <button
                        onClick={() =>
                          navigate(`/admin/customers/${customers?.customer_id}`)
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
      )}
    </>
  );
};

export default CustomerCard;
