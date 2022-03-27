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
