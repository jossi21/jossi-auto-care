import React from "react";
import EmployeeSelector from "../../../components/Admin/orders/EmployeeSelector";
import ChooseService from "../../../components/Admin/orders/ChooseService";
import AdditionalRequest from "../../../components/Admin/orders/AdditionalRequest";

const EditOrder = () => {
  return (
    <div>
      <div>
        <EmployeeSelector />
        <ChooseService />
        <AdditionalRequest />
      </div>
    </div>
  );
};

export default EditOrder;
