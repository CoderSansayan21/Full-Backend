const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  getStudentSubmissions,
  getTaskSubmissions,
  updateSubmission,
  deleteSubmission
} = require("../controllers/taskSubmissionController");

// ➕ Submit task (Student)
router.post(
  "/",
  auth,
  createSubmission
);

// 📄 Get all submissions (Admin only)
router.get(
  "/",
  auth,
  role("admin"),
  getSubmissions
);

// 🔍 Get single submission
router.get(
  "/:id",
  auth,
  getSubmissionById
);

// 👨‍🎓 Student submissions
router.get(
  "/student/:studentId",
  auth,
  getStudentSubmissions
);

// 📚 Task submissions
router.get(
  "/task/:taskId",
  auth,
  getTaskSubmissions
);

// ✏️ Update submission result (Admin only)
router.put(
  "/:id",
  auth,
  role("admin"),
  updateSubmission
);

// ❌ Delete submission (Admin only)
router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteSubmission
);

module.exports = router;