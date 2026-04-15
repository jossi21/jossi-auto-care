// import back end api_url
const api_url = import.meta.env.VITE_API_URL;

// the api function which connect with the back end and fetch the data
const addCustomer = async (customerData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customerData),
  };

  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
};

// the api function which connect with the back end and fetch all customer data
const allCustomers = async (page = 1, limit = 10) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${api_url}/api/customers?page=${page}&limit=${limit}`,
    requestOptions,
  );
  return response;
};

// get single customer
const singleCustomer = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${api_url}/api/customer/${id}`, requestOptions);
  return response;
};

// update customer
const updateCustomerData = async (updateData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  };

  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
};
// store functions on the variable
const customerService = {
  addCustomer,
  allCustomers,
  singleCustomer,
  updateCustomerData,
};

// export the functions
export default customerService;
