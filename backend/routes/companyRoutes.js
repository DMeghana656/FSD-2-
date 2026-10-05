const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM companies",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});
router.post("/", (req, res) => {
  const { company_name, domain } = req.body;
  const sql =
    "INSERT INTO companies (company_name, domain) VALUES (?, ?)";
  db.query(
    sql,
    [company_name, domain],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Company Added Successfully"
      });
    }
  );
});
// DELETE Company
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM companies WHERE company_id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      res.json({
        message: "Company Deleted Successfully"
      });
    }
  );
});
module.exports = router;