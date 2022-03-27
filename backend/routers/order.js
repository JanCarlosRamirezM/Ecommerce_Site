const express = require("express");
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrdes,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/orders/admin")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrdes);

module.exports = router;
