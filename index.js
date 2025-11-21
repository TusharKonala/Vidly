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

process.on("uncaughtException", (ex) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  winston.error(ex.message, ex);
});

winston.add(
  new winston.transports.File({
    filename: "logfile.log",
  })
);
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/vidly",
    level: "error",
  })
);

// throw new Error("Something failed during startup...");

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
