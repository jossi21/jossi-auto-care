import React, { useEffect, useState } from "react";
import { Table, Toast } from "react-bootstrap";
import { format } from "date-fns";
import customerService from "../../../../services/customer.services";
import { useNavigate } from "react-router";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaEdit,
  FaExternalLinkAlt,
  FaSearch,
} from "react-icons/fa";
import classes from "./customerList.module.css";
import Spinner from "../../Spinner";

const CustomerList = () => {
  // use navigate
  const navigate = useNavigate();
  // store in the state the returned data
  const [customers, setCustomers] = useState([]);
  const [apiErr, setApiErr] = useState(false);
  const [apiErrRes, setApiErrRes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // states used to search the user
  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  // the function to fetch the customers
  const fetchCustomers = async (page, pageLimit) => {
    setIsLoading(true);
    setApiErr(false);

    try {
      // get returned data from the backend
      const allCustomer = await customerService.allCustomers(page, pageLimit);
      // console.log(allCustomer);

      if (!allCustomer.ok) {
        if (allCustomer.status === 401) {
          setApiErrRes("Please login again");
        } else if (allCustomer.status === 403) {
          setApiErrRes("You aren't authorized to view this page");
        } else {
          setApiErrRes("Please try again");
        }
        setIsLoading(false);
        return;
      }
      const data = await allCustomer.json();
      // console.log("Fetched data:", data);
      if (data.contacts.customers && data.contacts.customers.length !== 0) {
        // console.log(data.contacts);
        setCustomers(data.contacts.customers);
        setFilteredCustomer(data.contacts.customers);

        // set pagination data
        if (data.contacts.pagination) {
          setPagination({
            total: data.contacts.pagination.total,
            totalPages: data.contacts.pagination.totalPages,
            hasNext: data.contacts.pagination.hasNext,
            hasPrevious: data.contacts.pagination.hasPrevious,
          });
          setCurPage(data.contacts.pagination.currentPage);
          setLimit(data.contacts.pagination.limit);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setApiErrRes("Something went wrong");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(1, 5);
  }, []);

  // pages
  // first page
  const firstPage = () => {
    if (curPage !== 1) {
      fetchCustomers(1, limit);
    }
  };

  // previous page
  const previousPage = () => {
    if (pagination.hasPrevious) {
      fetchCustomers(curPage - 1, limit);
    }
  };

  // next page
  const nextPage = () => {
    if (pagination.hasNext) {
      fetchCustomers(curPage + 1, limit);
    }
  };

  // last page
  const lastPage = () => {
    if (curPage !== pagination.totalPages) {
      fetchCustomers(pagination.totalPages, limit);
    }
  };

  // search function based on search term
  const searchHandler = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // if the term empty show all customers
    if (term === "") {
      setFilteredCustomer(customers);
    } else {
      // filter customers by name or email
      const filteredData = customers.filter((customer) => {
        return (
          customer.customer_first_name?.toLowerCase().includes(term) ||
          customer.customer_last_name?.toLowerCase().includes(term) ||
          customer.customer_email?.toLowerCase().includes(term) ||
          customer.customer_phone_number?.toLowerCase().includes(term)
        );
      });
      setFilteredCustomer(filteredData);
    }
  };

  // // single customer page
  // const edit = () => {};
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
              <h2>Customer List</h2>
            </div>
            <div className={`${classes.search__container}`}>
              <FaSearch
                className={`${classes.search__icon}`}
                size={15}
                color="rgba(0, 0, 0, 0.4)"
              />
              <input
                type="search"
                className={`${classes.search__input}`}
                placeholder="Search for a customer using first name, last name, email address for Phone"
                value={searchTerm}
                onChange={searchHandler}
              />
              {searchTerm && (
                <button
                  className={`${classes.clear__button}`}
                  onClick={() => {
                    setSearchTerm("");
                    setFilteredCustomer(customers);
                  }}
                >
                  Clear
                </button>
              )}
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
                  Loading customers...
                </span>
              </div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Active</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomer.length > 0 ? (
                    filteredCustomer.map((customer) => (
                      <tr key={customer.customer_id}>
                        <td>{customer.customer_id}</td>
                        <td>{customer.customer_first_name}</td>
                        <td>{customer.customer_last_name}</td>
                        <td>{customer.customer_email}</td>
                        <td>{customer.customer_phone_number}</td>
                        <td>
                          {format(
                            new Date(customer.customer_added_date),
                            "MM - dd -yyyy || kk:mm",
                          )}
                        </td>
                        <td>
                          {customer.active_customer_status ? "Yes" : "No"}
                        </td>
                        <td>
                          <div
                            style={{
                              background: "none",
                              display: "flex",
                              flexDirection: "row",
                              gap: "4px",
                            }}
                          >
                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/customers/${customer.customer_id}`,
                                )
                              }
                              style={{
                                background: "none",
                              }}
                            >
                              <FaEdit size={15} />
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/customer/profile/${customer?.customer_id}`,
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
                      <td>NO customers found matching "{searchTerm}"</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
            <div className={`${classes.filter__buttons}`}>
              <button onClick={firstPage}>
                <span>
                  <FaAngleDoubleLeft size={8} />
                </span>
                First
              </button>
              <button onClick={previousPage}>
                <span>
                  <FaAngleLeft size={8} />
                </span>
                Previous
              </button>
              <button onClick={nextPage} className={`${classes.next__last}`}>
                <span>
                  <FaAngleRight size={8} />
                </span>
                Next
              </button>
              <button onClick={lastPage} className={`${classes.next__last}`}>
                <span>
                  {" "}
                  <FaAngleDoubleRight size={8} />
                </span>
                Last
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomerList;
