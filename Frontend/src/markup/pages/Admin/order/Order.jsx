import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import classes from "../../../components/Admin/Customer/CustomerProfile.module.css";
import CustomerCard from "../../../components/Admin/orders/CustomerCard";
import ChooseService from "../../../components/Admin/orders/ChooseService";
import AdditionalRequest from "../../../components/Admin/orders/AdditionalRequest";
import orderService from "../../../../services/order.service";
import DatePickerComponent from "../../../components/DatePickerComponent";
import { useAuthContext } from "../../../../context/AuthContext";
import VehicleCard from "../../../components/Admin/orders/VehicleCard";
import EmployeeSelector from "../../../components/Admin/orders/EmployeeSelector";

const Order = () => {
  const navigate = useNavigate();
  const { customer_id, vehicle_id } = useParams();
  const { employee } = useAuthContext();

  // States
  const [selectedServices, setSelectedServices] = useState([]);
  const [estimatedDate, setEstimatedDate] = useState(null);
  const [completionDate, setCompletionDate] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handel order received
  const handelEmployeeSelect = (employeeId) => {
    setSelectedEmployee(employeeId);
  };
  // Handle estimated date selection
  const handleEstimatedDateChange = (date) => {
    setEstimatedDate(date);
    // console.log("Estimated date:", date);
  };
  // Handle completion date selection
  const handleCompletionDateChange = (date) => {
    setCompletionDate(date);
    // console.log("Completion date:", date);
  };
  // Handle service selection from ChooseService
  const handleServiceSelect = (service_id, checked) => {
    setSelectedServices((prev) => {
      if (checked) {
        return [...prev, { service_id }];
      } else {
        return prev.filter((s) => s.service_id !== service_id);
      }
    });
  };

  // Handle submit from AdditionalRequest
  const handleFinalSubmit = async ({ service_description, price }) => {
    // Validation
    if (selectedServices.length === 0) {
      setError("Please select at least one service");
      return;
    }

    if (!service_description) {
      setError("Please enter order description");
      return;
    }

    const orderData = {
      employee_id: selectedEmployee,
      customer_id: Number(customer_id),
      vehicle_id: Number(vehicle_id),
      order_description: service_description,
      estimated_completion_date: estimatedDate
        ? estimatedDate.toISOString()
        : null,
      order_total_price: Number(price),
      completion_date: completionDate ? completionDate.toISOString() : null,
      order_completed: completionDate ? 1 : 0,
      order_services: selectedServices,
    };

    console.log("Final order data:", orderData);

    try {
      setLoading(true);
      const res = await orderService.addOrder(orderData);
      const data = await res.json();

      if (data.error) {
        console.log(data);
        setError(data.error);
      } else {
        setError(data.message);
        console.log(data);
        console.log(data.message);
        navigate("/admin/orders");
      }
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`mx-auto col-lg-11 pb-3`}>
      <div className={`contact-section ${classes.customer__data__card}`}>
        <div className="auto-container">
          <div className="contact-title">
            <h2 className={`${classes.customer__name}`}>
              Create a new order page
            </h2>
          </div>
        </div>
      </div>

      {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}

      {/* Customer Card - just display */}
      <CustomerCard customer_id={customer_id} />

      {/* Vehicle Card - just display */}
      <div className="mb-5">
        <VehicleCard vehicle_id={vehicle_id} />
      </div>
      <div>
        <EmployeeSelector
          onSelectEmployee={handelEmployeeSelect}
          selectedEmployeeId={selectedEmployee}
        />
      </div>
      <div className={`mx-auto row ${classes.date__picker__bg} my-5 py-3 px-3`}>
        {/* Estimated Completion Date */}
        <div className="col-md-6">
          <DatePickerComponent
            onDateChange={handleEstimatedDateChange}
            label="Estimated Completion Date"
            showTimeSelect={true}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd HH:mm"
          />
        </div>

        {/* Actual Completion Date */}
        <div className="col-md-6">
          <DatePickerComponent
            onDateChange={handleCompletionDateChange}
            label="Actual Completion Date"
            showTimeSelect={true}
            // minDate={estimatedDate || new Date()}
            dateFormat="yyyy-MM-dd HH:mm"
          />
        </div>
      </div>

      {/* Choose Service - select services */}
      <ChooseService onSelectService={handleServiceSelect} />

      {/* Additional Request - description and submit */}
      <AdditionalRequest onFinalSubmit={handleFinalSubmit} loading={loading} />
    </section>
  );
};

export default Order;
