const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createEnrollment,
  getEnrollments,
  getStudentEnrollments,
  getCourseEnrollments,
  updateEnrollment,
  deleteEnrollment
} = require("../controllers/enrollmentController");

router.post(
  "/",
  auth,
  createEnrollment
);

router.get(
  "/",
  auth,
  role("admin"),
  getEnrollments
);

router.get(
  "/student/:studentId",
  auth,
  getStudentEnrollments
);

router.get(
  "/course/:courseId",
  auth,
  getCourseEnrollments
);

router.put(
  "/:id",
  auth,
  role("admin"),
  updateEnrollment
);

router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteEnrollment
);

module.exports = router;