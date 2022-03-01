const Product = require("../models/product");

// --------------------------------------------
// Create new product => /api/v1/product/new
// --------------------------------------------
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// --------------------------------------------
// Get all products => /api/v1/products
// --------------------------------------------
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();

  return res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// --------------------------------------------
// Get single product details => /api/v1/product/:id
// --------------------------------------------
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    product,
  });
};

// --------------------------------------------
// Update product => /api/v1/admin/product/:id
// --------------------------------------------
exports.updateProduct = async (req, res, next) => {
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
};

// --------------------------------------------
// Delete product => /api/v1/admin/product/:id
// --------------------------------------------
exports.deleteProduct = async (req, res, next) => {
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
};
