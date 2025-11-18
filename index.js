const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log('Connecting to the database "vidly"...'))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
