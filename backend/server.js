require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const skillRoutes = require("./routes/skillRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/skills", skillRoutes);
app.get("/", (req, res) => {
  res.send("Student Internship Portal Backend Running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});