const http = require("http");
const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

//server connection instance
const server = http.createServer(app);

//mongoDB connection
mongoose
  .connect(
    "mongodb+srv://admin:12345@mongodb.u5d7p4i.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to mongodb"));

server.listen(process.env.SERVER_PORT, () => {
  console.log(`server listining on port ${process.env.SERVER_PORT}`);
});
