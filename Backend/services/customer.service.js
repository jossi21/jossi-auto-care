// services/customer.service.js
const conn = require("../config/db.config");
// import crypto to generate random string
const { randomUUID } = require("crypto");
// Define the function which checks customer status (like employee)
async function checkIfCustomerExist(customer_email) {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
  const rows = await conn.query(query, [customer_email]);

  if (rows.length > 0) {
    return true;
  }
  return false;
}

// Define the function which handles customer creating process (like employee)
async function addCustomer(customerData) {
  let createdCustomer = {};

  try {
    const customer_hash = randomUUID();
    // Insert customer email and phone into customer_identifier table
    const query1 = `
      INSERT INTO customer_identifier 
      (customer_email, customer_phone_number, customer_hash) 
      VALUES (?, ?, ?)
    `;

    const rows1 = await conn.query(query1, [
      customerData.customer_email,
      customerData.customer_phone_number,
      customer_hash,
    ]);

    // Break if insert failed
    if (rows1.affectedRows !== 1) {
      return false;
    }

    // Get customer id
    const customer_id = rows1.insertId;

    // Insert customer name into customer_info table
    const query2 = `
      INSERT INTO customer_info 
      (customer_id, customer_first_name, customer_last_name, active_customer_status) 
      VALUES (?, ?, ?, ?)
    `;

    const rows2 = await conn.query(query2, [
      customer_id,
      customerData.customer_first_name,
      customerData.customer_last_name,
      customerData.active_customer_status,
    ]);

    // Construct the customer object to return
    createdCustomer = {
      customer_id: customer_id,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }

  return createdCustomer;
}

// the function which execute the sql query
async function getAllCustomers(page = 1, limit = 5) {
  try {
    // here it the math to calculate the records to skip
    const offset = (page - 1) * limit;

    // get total count of customers
    const query1 = "SELECT COUNT(*) as total FROM customer_identifier";
    const [rows1] = await conn.query(query1);
    const total = rows1.total;
    const totalPages = Math.ceil(total / limit);

    // query which select the customer
    const query2 =
      "SELECT customer_identifier.customer_id, customer_identifier.customer_email, customer_identifier.customer_phone_number , customer_info.customer_first_name, customer_info.customer_last_name, customer_identifier.customer_hash, customer_info.active_customer_status, customer_identifier.customer_added_date FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id ORDER BY customer_identifier.customer_id DESC LIMIT ? OFFSET ?";
    const rows2 = await conn.query(query2, [limit, offset]);
    return {
      customers: rows2,
      pagination: {
        currentPage: page,
        limit: limit,
        total: total,
        totalPages: totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// get the customer by its id
async function getSingleCustomer(id) {
  const query =
    "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_info.customer_id = customer_identifier.customer_id WHERE customer_identifier.customer_id = ?";
  const rows = await conn.query(query, [id]);
  return rows;
}

// update the customer
async function updateCustomer(customer_id, customerData) {
  const query1 =
    "UPDATE customer_identifier SET customer_phone_number = ? WHERE customer_id = ?";
  const rows1 = await conn.query(query1, [
    customerData.customer_phone_number,
    customer_id,
  ]);

  const query2 =
    "UPDATE customer_info SET customer_first_name = ? , customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?";
  const row2 = await conn.query(query2, [
    customerData.customer_first_name,
    customerData.customer_last_name,
    customerData.active_customer_status,
    customer_id,
  ]);

  return {
    success: "true",
  };
}
module.exports = {
  checkIfCustomerExist,
  addCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
};
