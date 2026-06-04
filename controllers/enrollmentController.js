const pool = require("../config/db");

// Enroll Student
exports.createEnrollment = async (req, res) => {

  try {

    const {
      studentId,
      courseId,
      enrollmentDate,
      status
    } = req.body;

    const [existing] = await pool.query(
      `SELECT * FROM enrollments
       WHERE studentId=? AND courseId=?`,
      [studentId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Already enrolled"
      });
    }

    await pool.query(
      `INSERT INTO enrollments
      (studentId,courseId,enrollmentDate,status)
      VALUES(?,?,?,?)`,
      [
        studentId,
        courseId,
        enrollmentDate,
        status
      ]
    );

    res.status(201).json({
      message: "Enrollment successful"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Enrollments
exports.getEnrollments = async (req, res) => {

  try {

    const [rows] = await pool.query(`
      SELECT
      enrollments.*,
      users.name,
      courses.courseName

      FROM enrollments

      JOIN users
      ON enrollments.studentId = users.id

      JOIN courses
      ON enrollments.courseId = courses.id
    `);

    res.json(rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Student Enrollments
exports.getStudentEnrollments =
async (req, res) => {

  try {

    const [rows] = await pool.query(
      `SELECT *
      FROM enrollments
      WHERE studentId=?`,
      [req.params.studentId]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Course Enrollments
exports.getCourseEnrollments =
async (req, res) => {

  try {

    const [rows] = await pool.query(
      `SELECT *
      FROM enrollments
      WHERE courseId=?`,
      [req.params.courseId]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Enrollment
exports.updateEnrollment =
async (req, res) => {

  try {

    const { status } = req.body;

    await pool.query(
      `UPDATE enrollments
      SET status=?
      WHERE id=?`,
      [status, req.params.id]
    );

    res.json({
      message: "Enrollment updated"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Enrollment
exports.deleteEnrollment =
async (req, res) => {

  try {

    await pool.query(
      "DELETE FROM enrollments WHERE id=?",
      [req.params.id]
    );

    res.json({
      message: "Enrollment deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};