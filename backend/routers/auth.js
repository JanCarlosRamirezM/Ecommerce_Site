const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  logout,
  forgotPassword,
} = require("../controllers/authController");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(login);
router.route("/auth/logout").get(logout);
router.route("/auth/password/forgot").post(forgotPassword);

module.exports = router;
