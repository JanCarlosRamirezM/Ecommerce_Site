const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    return res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // Wrong Mongoose Object Id Error
    if (err.name == "CastError") {
      const message = `Resource not fount. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }
    // Handling Mongoose validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling mongoose duplicate key error
    if ((err.code = 11000)) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT token
    if (err.name === "JsonWebTokenError") {
      const message = "Json Web Token is invalid. try Again!!!";
      error = new ErrorHandler(message, 400);
    }

    // Handling expired JWT token
    if (err.name === "JsonExpiredError") {
      const message = "Json Web Token is expired. try Again!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
