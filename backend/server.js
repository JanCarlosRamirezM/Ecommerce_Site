require("dotenv").config({ path: __dirname + "/config/config.env" });

const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
