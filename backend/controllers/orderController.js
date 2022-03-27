const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middlewares/catchAsyncErrors");

// --------------------------------------------
// Create a new order => /api/v1/order/new
// --------------------------------------------
exports.newOrder = CatchAsyncErrors(async (req, res, next) => {
  const newOrderData = {
    orderItem: req.body.orderItem,
    shippingInfo: req.body.shippingInfo,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
    paymentInfo: req.body.paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  };

  const order = await Order.create(newOrderData);

  res.status(200).json({
    success: true,
    order,
  });
});

// --------------------------------------------
// Get single order details => /api/v1/order/:id
// --------------------------------------------
exports.getSingleOrder = CatchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not fount", 400));
  }

  return res.status(200).json({
    success: true,
    order,
  });
});

// --------------------------------------------
// Get logged in user orders => /api/v1/order/me
// --------------------------------------------
exports.myOrders = CatchAsyncErrors(async (req, res, next) => {
  const idUser = req.user.id;
  const orders = await Order.find({ user: idUser });

  if (!orders) {
    return next(new ErrorHandler("Order not fount", 400));
  }

  return res.status(200).json({
    success: true,
    orders,
  });
});
