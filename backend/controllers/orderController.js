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

// --------------------------------------------
// Get all orders - ADMIN => /api/v1/admin/order
// --------------------------------------------
exports.allOrders = CatchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  return res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// --------------------------------------------
// Update / Process order- ADMIN => /api/v1/admin/order/:id
// --------------------------------------------
exports.updateOrder = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler("Order not fount", 400));

  if (order.orderStatus === "Delivered")
    return next(
      new ErrorHandler("You have already delivered this order ", 400)
    );

  order.orderItem.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();

  await order.save();

  return res.status(200).json({
    success: true,
  });
});

async function updateStock(idProduct, quantity) {
  const product = await Product.findById(idProduct);

  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// --------------------------------------------
// Delete order- ADMIN => /api/v1/admin/order/:id
// --------------------------------------------
exports.deleteOrder = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler("Order not fount", 400));

  await order.remove();

  return res.status(200).json({
    success: true,
  });
});
