const pool = require("../config/db");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const {
      courseId,
      courseName,
      duration,
      instructorName,
      description,
      status
    } = req.body;

    await pool.query(
      `INSERT INTO courses
      (courseId, courseName, duration, instructorName, description, status)
      VALUES (?,?,?,?,?,?)`,
      [
        courseId,
        courseName,
        duration,
        instructorName,
        description,
        status
      ]
    );

    res.status(201).json({
      message: "Course created successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Courses
exports.getCourses = async (req, res) => {
  try {

    const [courses] = await pool.query(
      "SELECT * FROM courses"
    );

    res.json(courses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Course
exports.getCourseById = async (req, res) => {
  try {

    const [course] = await pool.query(
      "SELECT * FROM courses WHERE id=?",
      [req.params.id]
    );

    res.json(course[0]);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {

    const {
      courseName,
      duration,
      instructorName,
      description,
      status
    } = req.body;

    await pool.query(
      `UPDATE courses
      SET courseName=?,
      duration=?,
      instructorName=?,
      description=?,
      status=?
      WHERE id=?`,
      [
        courseName,
        duration,
        instructorName,
        description,
        status,
        req.params.id
      ]
    );

    res.json({
      message: "Course updated"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM courses WHERE id=?",
      [req.params.id]
    );

    res.json({
      message: "Course deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};