// -------------------------------------
// check if user is authenticated or not
// -------------------------------------

const jwt = require("jsonwebtoken");
const user = require("../models/user");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// ----------------------
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return next(new errorHandler("Login first to access this resource", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await user.findById(decoded.id);

  next();
});
