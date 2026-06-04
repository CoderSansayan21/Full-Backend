const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// 📄 Get all users (Admin only)
router.get(
  "/",
  auth,
  role("admin"),
  getUsers
);

// 🔍 Get user by ID (Admin or self)
router.get(
  "/:id",
  auth,
  getUserById
);

// ✏️ Update user (Admin or self)
router.put(
  "/:id",
  auth,
  updateUser
);

// ❌ Delete user (Admin only)
router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteUser
);

module.exports = router;