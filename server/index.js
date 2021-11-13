require("dotenv").config();
const cors = require("cors");
const debug = require("debug")("users:server");
const express = require("express");
const morgan = require("morgan");

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

module.exports = { initializeServer, app };
