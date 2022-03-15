const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// --------------------------------------------
// Create new product => /api/v1/product/new
// --------------------------------------------
exports.newProduct = CatchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// --------------------------------------------
// Get all products => /api/v1/products?keyword=apple
// --------------------------------------------
exports.getProducts = CatchAsyncErrors(async (req, res, next) => {

  const apiFeatures = new APIFeatures(Product.find(), req.query).search();
  const products = await apiFeatures.query;

  return res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// --------------------------------------------
// Get single product details => /api/v1/product/:id
// --------------------------------------------
exports.getSingleProduct = CatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not fount", 400));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

// --------------------------------------------
// Update product => /api/v1/admin/product/:id
// --------------------------------------------
exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);

  if (!product) {
    return res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }

  product = req.body;

  product = await Product.findByIdAndUpdate(id, product, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: true,
    product,
  });
});

// --------------------------------------------
// Delete product => /api/v1/admin/product/:id
// --------------------------------------------
exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);

  if (!product) {
    return res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }

  product.remove();

  return res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});
