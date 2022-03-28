const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/product/review")
  .put(isAuthenticatedUser, createProductReview);

router
  .route("/product/all/reviews")
  .get(isAuthenticatedUser, getProductReviews);

  router
  .route("/product/review")
  .delete(isAuthenticatedUser, deleteProductReviews);


module.exports = router;
