const express = require("express");
const router = express.Router();
const db = require("../config/db");
// GET Internships
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM internships",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});
// POST Internship
router.post("/", (req, res) => {
  const { company_id, title, duration } = req.body;
  db.query(
    "INSERT INTO internships(company_id, title, duration) VALUES(?,?,?)",
    [company_id, title, duration],
    (err, result) => {
      if (err)
        return res.status(500).json(err);
      res.json({
        message: "Internship Added Successfully"
      });
    }
  );
});
// DELETE Internship
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM internships WHERE internship_id=?",
    [req.params.id],
    (err, result) => {
      if (err)
        return res.status(500).json(err);
      res.json({
        message: "Internship Deleted Successfully"
      });
    }
  );
});
module.exports = router;