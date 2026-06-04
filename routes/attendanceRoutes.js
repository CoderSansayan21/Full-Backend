const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createAttendance,
  getAttendance,
  getAttendanceById,
  getStudentAttendance,
  getCourseAttendance,
  updateAttendance,
  deleteAttendance
} = require("../controllers/attendanceController");

// ➕ Create Attendance (Admin only)
router.post(
  "/",
  auth,
  role("admin"),
  createAttendance
);

// 📄 Get all attendance (Admin only)
router.get(
  "/",
  auth,
  role("admin"),
  getAttendance
);

// 🔍 Get single attendance
router.get(
  "/:id",
  auth,
  getAttendanceById
);

// 👨‍🎓 Student attendance
router.get(
  "/student/:studentId",
  auth,
  getStudentAttendance
);

// 📚 Course attendance
router.get(
  "/course/:courseId",
  auth,
  getCourseAttendance
);

// ✏️ Update attendance (Admin only)
router.put(
  "/:id",
  auth,
  role("admin"),
  updateAttendance
);

// ❌ Delete attendance (Admin only)
router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteAttendance
);

module.exports = router;