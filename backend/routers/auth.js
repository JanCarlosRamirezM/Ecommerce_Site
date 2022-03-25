const express = require("express");
const router = express.Router();
const { registerUser, login } = require("../controllers/authController");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(login);

module.exports = router;
