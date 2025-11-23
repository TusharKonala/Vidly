const winston = require("winston");
const express = require("express");
const app = express();

// imported logging logic before the db connection so that if any error occurs
// in db it can be successfully logged
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening at port: ${port}`);
});

module.exports = server;
