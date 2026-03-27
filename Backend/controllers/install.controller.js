//  import the install service to handel communication with the database
const installService = require("../services/install.service");

// Create the function that handel the instal request
async function install(req, res, next) {
  const installMessage = await installService.install();

  //   check the response
  if (installMessage === 200) {
    res.status(200).json({
      message: installMessage,
    });
  } else {
    res.status(500).json({
      message: installMessage,
    });
  }
}

// export the controller
module.exports = { install };
