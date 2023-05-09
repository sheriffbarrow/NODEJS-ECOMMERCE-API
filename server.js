const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

//adding dependencies
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combine"));

app.use("", require("./api/routes/main"));

mongoose
  .connect(
    "mongodb+srv://admin:12345@mongodb.u5d7p4i.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to mongodb"));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server listining on port ${process.env.SERVER_PORT}`);
});
