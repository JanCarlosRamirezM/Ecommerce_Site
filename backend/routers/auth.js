const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
} = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(login);
router.route("/auth/logout").get(logout);
router.route("/auth/password/forgot").post(forgotPassword);
router.route("/auth/password/reset/:token").put(resetPassword);
router.route("/auth/me").get(isAuthenticatedUser, getUserProfile);

module.exports = router;
