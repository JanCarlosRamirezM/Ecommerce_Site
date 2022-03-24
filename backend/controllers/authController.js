const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middlewares/catchAsyncErrors");

// --------------------------------------------
// Register a user => /api/v1/user/register
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

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
});
