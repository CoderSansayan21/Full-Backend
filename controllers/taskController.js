const pool = require("../config/db");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const {
      courseId,
      title,
      description,
      dueDate,
      priority,
      status
    } = req.body;

    await pool.query(
      `INSERT INTO tasks
      (courseId, title, description, dueDate, priority, status)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        courseId,
        title,
        description,
        dueDate,
        priority,
        status
      ]
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {

    const [tasks] = await pool.query(
      "SELECT * FROM tasks"
    );

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Task By ID
exports.getTaskById = async (req, res) => {
  try {

    const [task] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [req.params.id]
    );

    if (task.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task[0]);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Tasks By Course
exports.getTasksByCourse = async (req, res) => {
  try {

    const [tasks] = await pool.query(
      "SELECT * FROM tasks WHERE courseId = ?",
      [req.params.courseId]
    );

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {

    const {
      title,
      description,
      dueDate,
      priority,
      status
    } = req.body;

    await pool.query(
      `UPDATE tasks
       SET title=?,
           description=?,
           dueDate=?,
           priority=?,
           status=?
       WHERE id=?`,
      [
        title,
        description,
        dueDate,
        priority,
        status,
        req.params.id
      ]
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM tasks WHERE id=?",
      [req.params.id]
    );

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};