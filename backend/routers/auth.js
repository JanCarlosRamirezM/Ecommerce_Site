const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateProfile,
  allUser,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(login);
router.route("/auth/logout").get(logout);
router.route("/auth/password/forgot").post(forgotPassword);
router.route("/auth/password/reset/:token").put(resetPassword);
router.route("/auth/me").get(isAuthenticatedUser, getUserProfile);
router.route("/auth/me/update").put(isAuthenticatedUser, updateProfile);

// -------------------
// Admin Routes
// -------------------
router
  .route("/auth/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUser);

router
  .route("/auth/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails);

router
  .route("/auth/admin/user/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser);

router
  .route("/auth/admin/user/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
