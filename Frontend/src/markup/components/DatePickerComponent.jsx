// components/DatePickerComponent.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
  onDateChange,
  selectedDate: propSelectedDate,
  label = "Select Date",
  showTimeSelect = true,
  minDate = new Date(),
  dateFormat = "yyyy-MM-dd HH:mm",
  className = "",
}) => {
  const [internalDate, setInternalDate] = useState(propSelectedDate || null);

  const handleDateChange = (date) => {
    setInternalDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const selected =
    propSelectedDate !== undefined ? propSelectedDate : internalDate;

  return (
    <div className={`form-group ${className}`}>
      <div>
        {label && <label className="form-label pr-2 fw-bold">{label}</label>}
        {selected ? (
          <span className="border p-1">
            {selected.toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        ) : (
          "No date selected"
        )}
      </div>
      <DatePicker
        selected={selected}
        onChange={handleDateChange}
        showTimeSelect={showTimeSelect}
        dateFormat={dateFormat}
        minDate={minDate}
        className="form-control form-control-sm"
        inline
      />
    </div>
  );
};

export default DatePickerComponent;
