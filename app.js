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
app.use(morgan("dev"));

//routes to handle requests
app.use("", require("./api/routes/main"));

//a middleware to handle not found routes
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
