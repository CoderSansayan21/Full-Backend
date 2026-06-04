const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

router.post(
  "/",
  auth,
  role("admin"),
  createCourse
);

router.get(
  "/",
  auth,
  getCourses
);

router.get(
  "/:id",
  auth,
  getCourseById
);

router.put(
  "/:id",
  auth,
  role("admin"),
  updateCourse
);

router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteCourse
);

module.exports = router;