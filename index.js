const error = require("./middleware/error");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");

winston.add(
  new winston.transports.File({
    filename: "logfile.log",
    handleExceptions: true,
    handleRejections: true,
  })
);

winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/vidly",
    level: "error",
    handleExceptions: true,
    handleRejections: true,
  })
);

process.on("uncaughtException", (ex) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  // winston.error(ex.message, ex);
  // added handleExceptions: true to winston.add below
  //used timeout so that we can allow winston to to log the uncaught exception

  setTimeout(() => process.exit(1), 200);
});

process.on("unhandledRejection", (ex) => {
  console.log("WE GOT AN UNHANDLED REJECTION");
  // winston.error(ex);
  //used timeout so that we can allow winston to log the rejected promise
  setTimeout(() => process.exit(1), 200);
});

// throw new Error("Something failed during startup...");

const p = Promise.reject(new Error("Something failed miserably.."));
p.then(() => console.log("Done"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log('Connecting to the database "vidly"...'))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
