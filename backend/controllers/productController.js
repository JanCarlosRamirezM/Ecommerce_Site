exports.getProducts = (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Products ",
  });
};
