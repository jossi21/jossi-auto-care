import React from "react";
import CustomerOrderCard from "../../../components/Admin/orders/CustomerOrderCard";
import { useParams } from "react-router";

const OrderProfile = () => {
  const { order_id } = useParams();
  return (
    <>
      <CustomerOrderCard order_id={order_id} />
    </>
  );
};

export default OrderProfile;
