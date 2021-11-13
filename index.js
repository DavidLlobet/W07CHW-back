require("dotenv").config();
const { connectDB } = require("./database");
const { initializeServer } = require("./server");

const port = process.env.SERVER_PORT || 6000;
(async () => {
  try {
    await connectDB(process.env.MONGODB_STRING);
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
