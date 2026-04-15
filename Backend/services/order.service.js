// import data base config
const conn = require("../config/db.config");

// import the module which generate randomUUID
const { randomUUID } = require("crypto");

// the function used to controller data duplication
async function checkIfOrderExists(orderData) {
  const incomingServices = orderData.order_services
    .map((s) => Number(s.service_id))
    .sort();

  const query = `
    SELECT orders.order_id
    FROM orders 
    INNER JOIN order_info  ON order_info.order_id = orders.order_id
    WHERE orders.customer_id = ?
      AND orders.vehicle_id = ?
      AND DATE(order_info.estimated_completion_date) = DATE(?)
      AND orders.active_order = 1
  `;

  const orders = await conn.query(query, [
    orderData.customer_id,
    orderData.vehicle_id,
    orderData.estimated_completion_date,
  ]);

  //  compare services properly
  for (const order of orders) {
    const services = await conn.query(
      `SELECT service_id FROM order_services WHERE order_id = ?`,
      [order.order_id],
    );

    const existingServices = services.map((s) => Number(s.service_id)).sort();

    const isSame =
      incomingServices.length === existingServices.length &&
      incomingServices.every((v, i) => v === existingServices[i]);

    if (isSame) {
      return [order]; // duplicate found
    }
  }

  return []; // no duplicate
}
// define the function
async function addOrder(orderData) {
  try {
    // store with in a variable the generated random number
    const order_hash = randomUUID();
    // insert data into orders table
    const query = `INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (?, ?, ?, 1, ?)`;

    const rows = await conn.query(query, [
      orderData.employee_id,
      orderData.customer_id,
      orderData.vehicle_id,
      order_hash,
    ]);

    // stop the process if there is some error
    if (rows.affectedRows !== 1) {
      return false;
    }
    // get inserted order_id
    const order_id = rows.insertId;

    // Format dates for MySQL
    const formatMySQLDate = (date) => {
      if (!date) return null;
      return date.replace("T", " ").slice(0, 19);
    };
    const estimatedDate = formatMySQLDate(orderData.estimated_completion_date);
    const completionDate = formatMySQLDate(orderData.completion_date);
    // insert data into order_info table
    const query1 =
      "INSERT INTO order_info (order_id, order_total_price,  estimated_completion_date, completion_date, additional_request, additional_requests_completed ) VALUES (?, ?, ?, ?, ?, ?)";

    const rows1 = await conn.query(query1, [
      order_id,
      orderData.order_total_price,
      estimatedDate,
      completionDate,
      orderData.order_description,
      0,
    ]);

    // insert into order_services(LOOP)
    for (const service of orderData.order_services) {
      const query2 =
        "INSERT INTO order_services (order_id, service_id, service_completed) VALUES(?, ?, ?)";

      const rows2 = await conn.query(query2, [order_id, service.service_id, 0]);
    }
    // insert into order_status
    const query3 =
      "INSERT INTO order_status (order_id, order_status) VALUES(?, ?)";

    const rows3 = await conn.query(query3, [
      order_id,
      orderData.order_completed,
    ]);

    return {
      success: "true",
    };
  } catch (error) {
    console.log(error);
  }
}

// getAllOrders
async function getAllOrders() {
  const query = `
    SELECT 
      o.order_id,

      -- Employee
      e.employee_id,
      ei.employee_first_name,

      -- Customer
      ci.customer_id,
      ci.customer_email,
      ci.customer_phone_number,
      c_info.customer_first_name,
      c_info.customer_last_name,

      -- Vehicle
      v.vehicle_id,
      v.vehicle_make,
      v.vehicle_model,
      v.vehicle_year,
      v.vehicle_tag,

      -- Order Info
      oi.additional_request AS order_description,
      o.order_date,
      oi.estimated_completion_date,
      oi.completion_date,
      oi.additional_requests_completed AS order_completed,
      os.order_status,

      -- Services
      (
        SELECT GROUP_CONCAT(service_id) 
        FROM order_services 
        WHERE order_id = o.order_id
      ) AS service_ids

    FROM orders o

    -- ✅ Change INNER JOIN to LEFT JOIN
    LEFT JOIN order_info oi ON oi.order_id = o.order_id
    LEFT JOIN order_status os ON os.order_id = o.order_id
    LEFT JOIN customer_identifier ci ON ci.customer_id = o.customer_id
    LEFT JOIN customer_info c_info ON c_info.customer_id = ci.customer_id
    LEFT JOIN customer_vehicle_info v ON v.vehicle_id = o.vehicle_id
    LEFT JOIN employee e ON e.employee_id = o.employee_id
    LEFT JOIN employee_info ei ON ei.employee_id = e.employee_id

    ORDER BY o.order_id DESC LIMIT 15
  `;

  const rows = await conn.query(query);

  return rows.map((order) => ({
    order_id: order.order_id,

    employee: {
      id: order.employee_id,
      name: order.employee_first_name || "Unknown",
    },

    customer: {
      id: order.customer_id,
      name:
        order.customer_first_name && order.customer_last_name
          ? `${order.customer_first_name} ${order.customer_last_name}`
          : "Unknown Customer",
      email: order.customer_email || "N/A",
      phone: order.customer_phone_number || "N/A",
    },

    vehicle: {
      id: order.vehicle_id,
      make:
        order.vehicle_make && order.vehicle_model
          ? `${order.vehicle_make} ${order.vehicle_model}`
          : "Unknown Vehicle",
      year: order.vehicle_year || "N/A",
      tag: order.vehicle_tag || "N/A",
    },

    order_description: order.order_description || "No description",
    order_date: order.order_date,
    estimated_completion_date: order.estimated_completion_date,
    completion_date: order.completion_date,
    order_completed: order.order_completed || 0,
    order_status: order.order_status || 0,

    order_services: order.service_ids
      ? order.service_ids.split(",").map((id) => ({
          service_id: parseInt(id),
        }))
      : [],
  }));
}

// get single order (by order_id, despite the function name)
async function getOrderByVehicleId(orderId) {
  if (!orderId) {
    return null;
  }

  const query = `
    SELECT 
      o.order_id,
      e.employee_id,
      ei.employee_first_name,
      ci.customer_id,
      ci.customer_email,
      ci.customer_phone_number,
      c_info.customer_first_name,
      c_info.customer_last_name,
      v.vehicle_id,
      v.vehicle_make,
      v.vehicle_model,
      v.vehicle_year,
      v.vehicle_tag,
      oi.additional_request AS order_description,
      o.order_date,
      oi.estimated_completion_date,
      oi.completion_date,
      oi.additional_requests_completed AS order_completed,
      os.order_status,
      (
        SELECT GROUP_CONCAT(s.service_name SEPARATOR ', ')
        FROM order_services os
        INNER JOIN common_services s ON s.service_id = os.service_id
        WHERE os.order_id = o.order_id
      ) AS service_names
    FROM orders o
    LEFT JOIN order_info oi ON oi.order_id = o.order_id
    LEFT JOIN order_status os ON os.order_id = o.order_id
    LEFT JOIN customer_identifier ci ON ci.customer_id = o.customer_id
    LEFT JOIN customer_info c_info ON c_info.customer_id = ci.customer_id
    LEFT JOIN customer_vehicle_info v ON v.vehicle_id = o.vehicle_id
    LEFT JOIN employee e ON e.employee_id = o.employee_id
    LEFT JOIN employee_info ei ON ei.employee_id = e.employee_id
    WHERE o.order_id = ?
  `;

  const rows = await conn.query(query, [orderId]);

  if (rows.length === 0) {
    return null;
  }

  const order = rows[0];

  // Convert service_names string to array
  if (order.service_names) {
    order.service_names = order.service_names.split(", ");
  } else {
    order.service_names = [];
  }

  return order;
}

// get orders by customer ID
async function getOrdersByCustomer(customerId) {
  if (!customerId) {
    return [];
  }

  const query = `
    SELECT 
      o.order_id,
      o.order_date,
      oi.estimated_completion_date,
      oi.completion_date,
      oi.additional_requests_completed AS order_completed,
      (
        SELECT GROUP_CONCAT(s.service_name SEPARATOR ', ')
        FROM order_services os
        INNER JOIN common_services s ON s.service_id = os.service_id
        WHERE os.order_id = o.order_id
      ) AS service_names
    FROM orders o
    LEFT JOIN order_info oi ON oi.order_id = o.order_id
    WHERE o.customer_id = ?
    ORDER BY o.order_id DESC
  `;

  const rows = await conn.query(query, [customerId]);
  return rows;
}
// export the functions
const orderService = {
  checkIfOrderExists,
  addOrder,
  getAllOrders,
  getOrderByVehicleId,
  getOrdersByCustomer,
};

module.exports = orderService;
