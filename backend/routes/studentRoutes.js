const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.get("/", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
});
router.post("/", (req, res) => {
  const { name, email, department } = req.body;
  const sql =
    "INSERT INTO students (name, email, department) VALUES (?, ?, ?)";
  db.query(
    sql,
    [name, email, department],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Student Added Successfully"
      });
    }
  );
});
router.put("/:id", (req, res) => {
  console.log("PUT BODY:", req.body);
  console.log("PUT ID:", req.params.id);
  const { name, email, department } = req.body;
  const sql =
    "UPDATE students SET name=?, email=?, department=? WHERE student_id=?";
  db.query(
    sql,
    [name, email, department, req.params.id],
    (err, result) => {
     if (err) {
  console.log(err);
  return res.status(500).json(err);
}
      res.json({
        message: "Student Updated Successfully"
      });
    }
  );
});
router.delete("/:id", (req, res) => {
  const sql =
    "DELETE FROM students WHERE student_id=?";
  db.query(
    sql,
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Student Deleted Successfully"
      });
    }
  );
});
module.exports = router;