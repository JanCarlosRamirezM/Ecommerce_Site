const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(login);
router.route("/auth/logout").get(logout);
router.route("/auth/password/forgot").post(forgotPassword);
router.route("/auth/password/reset/:token").put(resetPassword);

module.exports = router;
