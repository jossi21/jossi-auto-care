// CustomerOrderTable.jsx
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FaHandPointer } from "react-icons/fa";
import Spinner from "../../Spinner";

// Receive customers as prop
const CustomerOrderTable = ({ fetchedCustomer = [], isLoading }) => {
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className={`px-3`}>
          <Table striped bordered hover>
            <tbody>
              {fetchedCustomer.length > 0 ? (
                fetchedCustomer.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>
                    <td>
                      <div
                        style={{
                          alignItems: "center",
                          background: "none",
                          display: "flex",
                          gap: "4px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() =>
                            navigate(`/admin/orders/${customer.customer_id}`)
                          }
                          style={{
                            background: "none",
                          }}
                        >
                          <FaHandPointer size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </section>
      )}
    </>
  );
};

export default CustomerOrderTable;
