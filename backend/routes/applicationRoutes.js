const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM applications",
    (err, result) => {
      if (err)
        return res.status(500).json(err);
      res.json(result);
    }
  );
});
router.post("/", (req, res) => {
  const {
    student_id,
    internship_id
  } = req.body;
  db.query(
    "INSERT INTO applications(student_id, internship_id, status) VALUES(?,?,?)",
    [student_id, internship_id, "Applied"],
    (err, result) => {
      if (err)
        return res.status(500).json(err);
      res.json({
        message: "Application Submitted"
      });
    }
  );
});
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM applications WHERE application_id=?",
    [req.params.id],
    (err, result) => {
      if (err)
        return res.status(500).json(err);
      res.json({
        message: "Application Deleted Successfully"
      });
    }
  );
});
module.exports = router;