const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

//configuring CORS Asynchronously
const whitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://example:3000",
];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

//adding dependencies
app.use(helmet());
app.use(bodyParser.json());

app.use(morgan("combine"));

app.use("", require("./api/routes/main"));

//mongoDB connection
mongoose
  .connect(
    "mongodb+srv://admin:12345@mongodb.u5d7p4i.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to mongodb"));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server listining on port ${process.env.SERVER_PORT}`);
});
