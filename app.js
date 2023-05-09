const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

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

//adding dependencies
app.use(cors(corsOptionsDelegate));
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("combine"));

//routes imports
app.use("", require("./api/routes/main"));

module.exports = app;
