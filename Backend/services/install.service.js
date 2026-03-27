// import the query function
const conn = require("../config/db.config");

// import fs module to read db queries
const fs = require("fs");
const { rejects } = require("assert");

// the function that used to create the database table
async function install() {
  // import de.config file
  const queryFile = __dirname + "/sql/initial-queries.sql";

  // define the variables they used to store queries, read query lines
  let queries = [];
  let finalMessage = {};
  let tempLine = "";

  // read the sql files line by line
  const lines = fs.readFileSync(queryFile, "utf-8").split("\n");

  // the function handel asynchronous reading and put the values on the variables
  const executed = await new Promise((resolve, reject) => {
    // loop all over files
    lines.forEach((line) => {
      if (line.trim().startsWith("--") || line.trim() === "") {
        // skip if it is comment or empty line
        return;
      }
      tempLine += line;
      if (line.trim().endsWith(";")) {
        // it is query ends then prepare the individual query
        const sqlQuery = tempLine.trim();
        // add query  to the queries list
        // console.log(sqlQuery);
        queries.push(sqlQuery);
        tempLine = "";
      }
    });
    // console.log(queries);
    resolve("Queries are added to the list");
  });

  // loop through the queries and execute them one by one asynchronously
  for (let i = 0; i < queries.length; i++) {
    try {
      const result = await conn.query(queries[i]);
      console.log("Table created");
    } catch (error) {
      finalMessage.message = "Not all tables are created";
    }
  }

  // prepare the final message to return to the controller
  if (!finalMessage.message) {
    finalMessage.message = "All tables are created";
    finalMessage.status = 200;
  } else {
    finalMessage.status = 500;
  }

  return finalMessage;
}

// export the function
module.exports = { install };
