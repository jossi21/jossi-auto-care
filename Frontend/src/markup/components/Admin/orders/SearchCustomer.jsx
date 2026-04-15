import React, { useEffect, useState } from "react";
import customerService from "../../../../services/customer.services";
import { FaSearch } from "react-icons/fa";
import classes from "../../../components/Admin/Customer/customerList.module.css";
import { useNavigate } from "react-router";
import CustomerOrderTable from "./CustomerOrderTable";

const SearchCustomer = () => {
  const navigate = useNavigate();
  // store in the state the returned data
  const [customers, setCustomers] = useState([]);
  const [apiErr, setApiErr] = useState(false);
  const [apiErrRes, setApiErrRes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // states used to search the user
  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // the function to fetch the customers
  const fetchCustomers = async () => {
    setIsLoading(true);
    setApiErr(false);

    try {
      // get returned data from the backend
      const allCustomer = await customerService.allCustomers();
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
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setApiErrRes("Something went wrong");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(1, 10);
  }, []);

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
        <section className="contact-section ">
          <div className="auto-container">
            <div className="contact-title">
              <h2 className={`${classes.customer__name}`}>
                Create a new order
              </h2>
            </div>
            <div
              className={`${classes.search__order__border} col-lg-11 mx-auto`}
            >
              <div
                className={`${classes.search__container} ${classes.order__table_border}`}
              >
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
              </div>
              {searchTerm ? (
                <CustomerOrderTable
                  fetchedCustomer={filteredCustomer}
                  isLoading={isLoading}
                />
              ) : (
                <div className="form-group col-md-12">
                  <button
                    onClick={() => navigate("/admin/add-customer")}
                    className="theme-btn btn-style-one"
                    type="submit"
                    data-loading-text="Please wait..."
                  >
                    add Customer
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SearchCustomer;
