import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let applications = [];
let certificates = [];

// GET applications
app.get("/api/applications", (req, res) => {
  res.json(applications);
});

// POST application
app.post("/api/applications", (req, res) => {
  const application = {
    id: Date.now(),
    ...req.body,
    status: "Applied",
  };

  applications.push(application);

  res.status(201).json(application);
});

// GET certificates
app.get("/api/certificates", (req, res) => {
  res.json(certificates);
});

// POST certificate
app.post("/api/certificates", (req, res) => {
  const certificate = {
    id: Date.now(),
    ...req.body,
  };

  certificates.push(certificate);

  res.status(201).json(certificate);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});