const express = require("express");
const router = express.Router();
const db = require("../config/db");
// GET Skills
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM skills",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
});
// POST Skill
router.post("/", (req, res) => {
  const { skill_name } = req.body;
  db.query(
    "INSERT INTO skills (skill_name) VALUES (?)",
    [skill_name],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      res.json({
        message: "Skill Added Successfully",
      });
    }
  );
});
// DELETE Skill
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM skills WHERE skill_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      res.json({
        message: "Skill Deleted Successfully",
      });
    }
  );
});
module.exports = router;