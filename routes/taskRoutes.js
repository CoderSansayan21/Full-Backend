const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  getTasksByCourse,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// ➕ Create Task (Admin only)
router.post(
  "/",
  auth,
  role("admin"),
  createTask
);

// 📄 Get all tasks
router.get(
  "/",
  auth,
  getTasks
);

// 🔍 Get task by ID
router.get(
  "/:id",
  auth,
  getTaskById
);

// 📚 Get tasks by course
router.get(
  "/course/:courseId",
  auth,
  getTasksByCourse
);

// ✏️ Update task (Admin only)
router.put(
  "/:id",
  auth,
  role("admin"),
  updateTask
);

// ❌ Delete task (Admin only)
router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteTask
);

module.exports = router;