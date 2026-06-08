const express = require("express");


const app = express();

app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/task-submissions", require("./routes/taskSubmissionRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));

app.get("/", (req, res) => {
  res.send(" UKI Student Backend Running");
});

// Start Server
app.listen(3000, () => {
    console.log("Server Started");
});