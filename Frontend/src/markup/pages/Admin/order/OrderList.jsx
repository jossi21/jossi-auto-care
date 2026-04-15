import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import orderService from "../../../../services/order.service";
import Spinner from "../../../components/Spinner";
import classes from "../../../../assets/styles/custom.module.css";

const OrderList = () => {
  // use navigate
  const navigate = useNavigate();
  // store in the state the returned data
  const [orders, setOrders] = useState([]);
  const [apiErr, setApiErr] = useState(false);
  const [apiErrRes, setApiErrRes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // the function to fetch the customers
    const fetchOrders = async () => {
      setIsLoading(true);
      setApiErr(false);

      try {
        // get returned data from the backend
        const res = await orderService.getALLOrders();
        // console.log(res);
        if (!res.ok) {
          if (res.status === 401) {
            setApiErrRes("Please login again");
          } else if (res.status === 403) {
            setApiErrRes("You aren't authorized to view this page");
          } else {
            setApiErrRes("Please try again");
          }
          setIsLoading(false);
          return;
        }
        const data = await res.json();
        // console.log("Fetched data:", data);
        if (data.data && data.data.length !== 0) {
          setOrders(data.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setApiErrRes("Something went wrong");
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);
  // console.log(orders);
  return (
    <>
      {apiErr ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrRes}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Order List</h2>
            </div>
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
                  Loading orders...
                </span>
              </div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Vehicle </th>
                    <th>Order Date</th>
                    <th>Received By</th>
                    <th>Order Status</th>
                    <th>Edit/View</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>
                          <div className="row">
                            <span
                              className={`${classes.service__title} fw-bold`}
                            >
                              {order.customer.name}
                            </span>
                            <span>{order.customer.email}</span>
                            <span>{order.customer.phone}</span>
                          </div>
                        </td>
                        <td>
                          <div className="row">
                            <span
                              className={`${classes.service__title} fw-bold`}
                            >
                              {order.vehicle.make}
                            </span>
                            <span>{order.vehicle.year}</span>
                            <span>{order.vehicle.tag}</span>
                          </div>
                        </td>
                        <td>
                          {format(new Date(order.order_date), "MM/dd/yyyy")}
                        </td>
                        <td>{order.employee.name}</td>
                        <td className="align-middle text-center">
                          <span
                            className={`${classes.status__badge} ${order.order_status === 1 ? `${classes.status__in__progress}` : `${classes.status__completed}`}`}
                          >
                            {order.order_status === 1
                              ? "In progress"
                              : "Completed"}
                          </span>{" "}
                        </td>
                        <td className="align-middle text-center">
                          <div>
                            <button
                              onClick={() =>
                                navigate(`/admin/orders/${order.order_id}/edit`)
                              }
                              style={{
                                background: "none",
                                paddingRight: "10px",
                              }}
                            >
                              <FaEdit size={15} />
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/orders/${order.order_id}/profile`,
                                )
                              }
                              style={{
                                background: "none",
                              }}
                            >
                              <FaExternalLinkAlt size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>NO orders found matching </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default OrderList;
