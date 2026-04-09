import React, { useEffect, useState } from "react";
import employeeService from "../../../../services/employee.service";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Spinner from "../../Spinner";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [apiErr, setApiErr] = useState(false);
  const [apiErrMessage, setApiErrMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //   console.log(employee);

  // // use the context
  // const { employee } = useAuthContext();
  // console.log(employee);
  const allEmployee = employeeService.getAllEmployees();
  // console.log(allEmployee);
  useEffect(() => {
    setIsLoading(true);
    setApiErr(false);
    allEmployee
      .then((res) => {
        //   console.log(res);
        if (!res.ok) {
          setApiErr(true);
          if (res.status === 401) {
            setApiErrMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrMessage("You are not authorized to view this page");
          } else {
            setApiErrMessage("Please try again");
          }
          setIsLoading(false);
        }
        return res.json();
      })
      .then((data) => {
        if (data.contacts.length !== 0) {
          // console.log(data.contacts);
          setEmployees(data.contacts);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setApiErrMessage("Something went wrong");
        setIsLoading(false);
      });
  }, []);

  // delete employee handler
  const DeleteEmployee = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee")) {
      try {
        const res = await employeeService.deleteEmployee(employeeId);
        const result = await res.json();
        if (res.ok) {
          setEmployees(
            employees.filter((employee) => employee.employee_id !== employeeId),
          );
          alert(result.message);
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.log("Delete error: ", error);
      }
    }
  };
  return (
    <>
      {apiErr ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Employees</h2>
            </div>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Spinner isLoading={isLoading} />
                <span style={{ marginTop: "10px", fontWeight: "bolder" }}>
                  Loading Employees...
                </span>
              </div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Active </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>
                        {format(
                          new Date(employee.added_date),
                          "MM - dd - yyyy || kk:mm",
                        )}
                      </td>
                      <td>{employee.company_role_name}</td>
                      <td>
                        <div className="edit-delete-icons text-center">
                          <button
                            style={{ background: "none", border: "none" }}
                            onClick={() =>
                              navigate(
                                `/admin/employees/${employee.employee_id}`,
                                { state: { employee } },
                              )
                            }
                          >
                            <FaEdit style={{ width: "35px" }} />
                          </button>{" "}
                          <span className="px-3">|</span>
                          <button
                            style={{ background: "none", border: "none" }}
                            onClick={() => DeleteEmployee(employee.employee_id)}
                          >
                            <FaTrash style={{ width: "35px" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default EmployeeList;
