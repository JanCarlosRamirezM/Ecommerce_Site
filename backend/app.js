const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");

app.use(express.json());

// Import all routes
const products = require("./routers/product");
const auth = require("./routers/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
