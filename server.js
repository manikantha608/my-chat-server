
const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const socketServer = require("./socketServer");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || process.env.API_PORT;
const server = http.createServer(app);

socketServer.registerSocketServer(server)

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connection is successful!")
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed. Server is not started.");
    console.error(err);
    process.exit(1); // Exit on database connection error
  });