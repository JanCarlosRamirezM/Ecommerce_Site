const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.BD_LOCAL_URI, {
      useunifiedtopology: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    })
    .catch((err) => {
      console.log("Error in DB connection: " + err);
    });
};

module.exports = connectDatabase;
