const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.rejections.handle(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "uncaughtRejections.log" })
  );
  // handles uncaught rejected promises

  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  // handles uncaught exception ie throw new Error(), etc

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

  process.on("uncaughtException", (ex) => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION");

    //used timeout so that we can allow winston to to log the uncaught exception
    setTimeout(() => process.exit(1), 200);
  });

  process.on("unhandledRejection", (ex) => {
    //used timeout so that we can allow winston to log the rejected promise
    setTimeout(() => process.exit(1), 200);
  });
};
