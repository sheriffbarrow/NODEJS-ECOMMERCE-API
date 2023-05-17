const http = require("http");
const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

//server connection instance
const server = http.createServer(app);

//mongoDB connection
async function dbConnection() {
  const response = await mongoose.connect(process.env.MONGO_URL);
  if (!response) {
    console.log(`async connection to db failed with port: ${process.PORT}`);
  } else {
    console.log("async connection made");
  }
}
dbConnection();

server.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`server listining on port ${process.env.SERVER_PORT}`);
});
