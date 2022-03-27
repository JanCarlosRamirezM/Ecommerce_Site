const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { emailAndPasswordEntered } = require("../utils/utilityFunctions");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

// --------------------------------------------
// Forgot password => /api/v1/auth/password/forgot
// --------------------------------------------
exports.forgotPassword = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(new ErrorHandler("User not found with this email", 404));

  // Get reset token
  const resetToken = user.getResetPasswordTokem();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\n\if you have not requested this email. then ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce password recovery!",
      message,
    });

    res
      .status(200)
      .json({ success: true, message: `Email sent to: ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// --------------------------------------------
// reset password => /api/v1/auth/password/reset/:token
// --------------------------------------------
exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );

  const password1 = req.body.password;
  const password2 = req.body.confirmPassword;

  if (password1 !== password2)
    return next(new ErrorHandler("Password does not match", 400));

  // Setup new password
  user.password = password1;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

// --------------------------------------------
// Get currently logged in user details => /api/v1/auth/me
// --------------------------------------------
exports.getUserProfile = CatchAsyncErrors(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    user,
  });
});

// --------------------------------------------
// Update user profile => /api/v1/auth/me/update
// --------------------------------------------
exports.updateProfile = CatchAsyncErrors(async (req, res, next) => {
  //  TODO: update avatar

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const id = req.user.id;
  const user = await User.findByIdAndUpdate(id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// --------------------------------------------
// Get all users => /api/v1/auth/admin/users
// --------------------------------------------
exports.allUser = CatchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
// --------------------------------------------
// Get user details => /api/v1/auth/admin/user/:id
// --------------------------------------------
exports.getUserDetails = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user)
    return next(new ErrorHandler(`User does not found with id: ${id}`, 500));

  res.status(200).json({
    success: true,
    user,
  });
});
