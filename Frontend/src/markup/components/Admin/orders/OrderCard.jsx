import React from "react";
import classes from "../Customer/CustomerProfile.module.css";
import CustomerCard from "./CustomerCard";
import VehicleTableCard from "./VehicleTableCard";
import { useParams } from "react-router";

const OrderCard = () => {
  const { customer_id } = useParams();
  return (
    <>
      <section className={`mx-auto col-lg-11`}>
        <div className={`contact-section ${classes.customer__data__card}`}>
          <div className="auto-container">
            <div className="contact-title">
              <h2 className={`${classes.customer__name}`}>
                Create a new order
              </h2>
            </div>
          </div>
        </div>
        {/* customers info card */}
        <CustomerCard customer_id={customer_id} />
        {/* customers vehicle card */}
        <VehicleTableCard />
      </section>
    </>
  );
};

export default OrderCard;
