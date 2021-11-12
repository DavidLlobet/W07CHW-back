const debug = require("debug")("users:database");
const { mongoose } = require("mongoose");

const connectDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret._v;
      },
    });
    mongoose.connect(process.env.MONGODB_STRING, (error) => {
      if (error) {
        debug("No se ha podido iniciar la base de datos.");
        debug(error.message);
        reject();
        return;
      }
      debug("Conectado a la base de datos");
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug("Desconectado de la base de datos");
    });
  });

module.exports = { connectDB };
