require("dotenv").config();
const cors = require("cors");
const debug = require("debug")("users:server");
const express = require("express");
const morgan = require("morgan");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");

const usersRoutes = require("./routes/usersRoutes");

const app = express();

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Escuchando en el puerto ${port}`);
      resolve(server);
    });
    server.on("error", (error) => {
      debug("Ha habido un error al iniciar el servidor");
      if (error.code === "EADDRINUSE") {
        debug(`El puerto ${port} está en uso.`);
      }
      reject();
    });
    server.on("close", () => {
      debug("Servidor express desconectado");
    });
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/", notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = { initializeServer, app };
