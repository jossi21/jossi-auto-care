import React, { useState, useEffect } from "react";
import employeeService from "../../../../services/employee.service";

const EmployeeSelector = ({
  onSelectEmployee,
  selectedEmployeeId,
  required = true,
}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await employeeService.getAllEmployees();

        if (!response.ok) {
          throw new Error(`Failed to fetch employees: ${response.status}`);
        }

        const data = await response.json();
        console.log("Full API response:", data);

        // Handle different response structures
        let employeeList = [];

        if (Array.isArray(data)) {
          employeeList = data;
        } else if (data.data && Array.isArray(data.data)) {
          employeeList = data.data;
        } else if (data.employees && Array.isArray(data.employees)) {
          employeeList = data.employees;
        } else if (data.contacts && Array.isArray(data.contacts)) {
          employeeList = data.contacts;
        } else {
          console.warn("Unexpected response format:", data);
          employeeList = [];
        }

        console.log("Employee list:", employeeList);
        setEmployees(employeeList);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (error) {
    return (
      <div className="form-group mb-4">
        <label className="form-label fw-bold">Assign Employee</label>
        <div className="text-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <section>
          <div className="form-group mb-4">
            <label className="form-label fw-bold">Assign Employee</label>
            <div className="text-danger">Error: {error}</div>
          </div>
        </section>
      )}
      <section>
        {employees.length === 0 ? (
          <div className="form-group mb-4">
            <label className="form-label fw-bold">Assign Employee</label>
            <div className="text-warning">
              No employees found. Please add employees first.
            </div>
          </div>
        ) : (
          <div className="form-group mb-4">
            <label className="form-label fw-bold">
              Assign Employee{" "}
              {required && <span className="text-danger">*</span>}
            </label>

            <select
              className="form-select"
              value={selectedEmployeeId || ""}
              onChange={(e) =>
                onSelectEmployee(
                  e.target.value ? parseInt(e.target.value) : null,
                )
              }
              required={required}
            >
              <option value="">-- Select Employee --</option>
              {employees.map((employee) => (
                <option
                  key={employee.employee_id || employee.id}
                  value={employee.employee_id || employee.id}
                >
                  {employee.employee_first_name || employee.first_name}{" "}
                  {employee.employee_last_name || employee.last_name}
                </option>
              ))}
            </select>
          </div>
        )}
      </section>
    </>
  );
};

export default EmployeeSelector;
