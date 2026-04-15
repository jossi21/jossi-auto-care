// first import back end url
const api_url = import.meta.env.VITE_API_URL;

// API call calling the orders from the back end
const getALLOrders = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${api_url}/api/orders`, requestOptions);
  return response;
};

// Api calling addOrder from the back end
const addOrder = async (orderData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  };
  const response = await fetch(`${api_url}/api/order`, requestOptions);
  return response;
};

// get single order
const getSingleOrder = async (order_id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${api_url}/api/order/${order_id}`,
    requestOptions,
  );

  return response;
};

//function to get orders by customer ID
const getOrdersByCustomer = async (customerId) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${api_url}/api/orders/customer/${customerId}`,
    requestOptions,
  );
  return response;
};

const orderService = {
  getALLOrders,
  addOrder,
  getSingleOrder,
  getOrdersByCustomer,
};

// export the function
export default orderService;
