import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import classes from "../Customer/CustomerProfile.module.css";
import { FaTimes } from "react-icons/fa";
import Spinner from "../../Spinner";
import orderService from "../../../../services/order.service";

const CustomerOrderCard = ({ order_id }) => {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [apiErr, setApiErr] = useState(false);
  const [apiErrRes, setApiErrRes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!order_id) {
        setApiErrRes("No order ID provided");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setApiErr(false);

      try {
        const res = await orderService.getSingleOrder(order_id);

        if (!res.ok) {
          if (res.status === 401) {
            setApiErrRes("Please login again");
          } else if (res.status === 403) {
            setApiErrRes("You aren't authorized to view this page");
          } else if (res.status === 404) {
            setApiErrRes("Order not found");
          } else {
            setApiErrRes("Please try again");
          }
          setIsLoading(false);
          return;
        }

        const data = await res.json();
        console.log("Fetched data:", data);

        setOrder(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setApiErrRes("Something went wrong");
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [order_id]);
  if (isLoading) {
    return <Spinner />;
  }

  if (apiErr) {
    return (
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>{apiErrRes}</h2>
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return <div>No order found</div>;
  }

  return (
    <section
      className={`contact-section row ${classes.service__order__bg} pb-3 my-5 col-lg-11 mx-auto`}
    >
      <div className="auto-container">
        <div className="contact-title">
          <h2>Order Information</h2>
        </div>
        <div className="service-block-one">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <div className="border p-3">
              <div className="border p-3">
                <div className="border bg-secondary px-3">
                  <h4 className={`${classes.customer__name} fw-bolder`}>
                    {order.customer_first_name} {order.customer_last_name}
                  </h4>
                </div>
                <div>
                  <span className="fw-bold pr-1">Customer email:</span>{" "}
                  {order.customer_email}
                </div>
                <div>
                  <span className="fw-bold pr-1">Customer Phone:</span>{" "}
                  {order.customer_phone_number}
                </div>
              </div>

              <div>
                <div className="border-2 bg-secondary p-3 my-2">
                  <div>
                    <span className="fw-bold pr-1">Received by:</span>{" "}
                    {order.employee_first_name}
                  </div>
                </div>

                <div className="border-2">
                  <div>
                    <span className="fw-bold pr-1">Vehicle:</span>{" "}
                    {order.vehicle_make} {order.vehicle_model}
                  </div>
                  <div>
                    <span className="fw-bold pr-1">Vehicle tag:</span>{" "}
                    {order.vehicle_tag}
                  </div>
                </div>

                {/*  Services section  */}
                <div>
                  <span className="fw-bold pr-1">Services:</span>
                  {order.service_names && order.service_names.length > 0 ? (
                    <ul className="mb-0">
                      {order.service_names.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No services selected</p>
                  )}
                </div>

                <div className="border-2">
                  <div>
                    <span className="fw-bold pr-1">Order date:</span>{" "}
                    {format(new Date(order.order_date), "MM/dd/yyyy")}
                  </div>
                  <div>
                    <span className="fw-bold pr-1">
                      {" "}
                      Estimated completion Date:
                    </span>{" "}
                    {format(
                      new Date(order.estimated_completion_date),
                      "MM/dd/yyyy",
                    )}
                  </div>
                  <div>
                    <span className="fw-bold pr-1"> Completion Date:</span>{" "}
                    {format(new Date(order.completion_date), "MM/dd/yyyy")}
                  </div>
                  <div>
                    <span className="fw-bold pr-1">Order status:</span>{" "}
                    {order.completion_date === 0 ? "Completed" : "In progress"}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2" style={{ width: "40px" }}>
              <button
                className="btn btn-link p-0"
                style={{ background: "none", border: "none" }}
                onClick={() => navigate("/admin/orders")}
              >
                <FaTimes size={15} color="red" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerOrderCard;
