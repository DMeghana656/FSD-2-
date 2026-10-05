const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");

// ==========================================
// FILE UPLOAD SETTINGS
// ==========================================

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG, JPEG and PNG files are allowed"));
    }
  },
});

// ==========================================
// GET ALL CERTIFICATES
// ==========================================

router.get("/", (req, res) => {
  const sql = `
    SELECT
      certificates.certificate_id,
      certificates.student_id,
      certificates.certificate_name,
      certificates.issue_date,
      certificates.certificate_file_type,
      students.name AS student_name
    FROM certificates
    LEFT JOIN students
      ON certificates.student_id = students.student_id
    ORDER BY certificates.certificate_id ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("GET CERTIFICATES ERROR:", err);
      return res.status(500).json(err);
    }

    console.log("CERTIFICATE DATA:", result);

    res.json(result);
  });
});

// ==========================================
// ADD CERTIFICATE + UPLOAD FILE
// ==========================================

router.post("/", upload.single("certificate_file"), (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const {
    student_id,
    certificate_name,
    issue_date,
  } = req.body;

  if (!student_id || !certificate_name || !issue_date) {
    return res.status(400).json({
      message: "Student ID, Certificate Name and Issue Date are required",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Please upload a certificate file",
    });
  }

  const sql = `
    INSERT INTO certificates
    (
      student_id,
      certificate_name,
      issue_date,
      certificate_file,
      certificate_file_type
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    student_id,
    certificate_name,
    issue_date,
    req.file.buffer,
    req.file.mimetype,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("CERTIFICATE INSERT ERROR:", err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Certificate Added Successfully",
      certificate_id: result.insertId,
    });
  });
});

// ==========================================
// VIEW CERTIFICATE FILE
// ==========================================

router.get("/:id/file", (req, res) => {
  const sql = `
    SELECT
      certificate_file,
      certificate_file_type
    FROM certificates
    WHERE certificate_id = ?
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log("GET CERTIFICATE FILE ERROR:", err);
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Certificate not found",
      });
    }

    if (!result[0].certificate_file) {
      return res.status(404).json({
        message: "Certificate file not found",
      });
    }

    res.setHeader(
      "Content-Type",
      result[0].certificate_file_type || "application/pdf"
    );

    res.send(result[0].certificate_file);
  });
});

// ==========================================
// DELETE CERTIFICATE
// ==========================================

router.delete("/:id", (req, res) => {
  const sql = `
    DELETE FROM certificates
    WHERE certificate_id = ?
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log("DELETE CERTIFICATE ERROR:", err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Certificate Deleted Successfully",
    });
  });
});

// ==========================================
// UPLOAD ERROR HANDLER
// ==========================================

router.use((err, req, res, next) => {
  console.log("CERTIFICATE UPLOAD ERROR:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File size must be less than 10 MB",
      });
    }

    return res.status(400).json({
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }

  next();
});

module.exports = router;