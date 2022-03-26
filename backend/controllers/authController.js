const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { emailAndPasswordEntered } = require("../utils/utilityFunctions");
const sendToken = require("../utils/jwtToken");

// --------------------------------------------
// Register a user => /api/v1/auth/register
// --------------------------------------------
exports.registerUser = CatchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "products/dsvbpny402gelwugv2le",
      url: "https://res.cloudinary.com/bookit/image/upload/v1608062030/products/dsvbpny402gelwugv2le.jpg",
    },
  });

  sendToken(user, 200, res);
});

// --------------------------------------------
// Login a user => /api/v1/auth/login
// --------------------------------------------
exports.login = CatchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!emailAndPasswordEntered(email, password))
    return next(new ErrorHandler("Please enter email & password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  if (!(await user.comparePassword(password)))
    return next(new ErrorHandler("Invalid email or password", 401));

  sendToken(user, 200, res);
});

// --------------------------------------------
// Logout a user => /api/v1/auth/logout
// --------------------------------------------
exports.logout = CatchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logget out",
  });
});
