import React, { useState } from "react";

function ApplicationForm() {
  const [formData, setFormData] = useState({
    internshipName: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      alert("Internship application submitted successfully!");

      setFormData({
        internshipName: "",
        companyName: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit application");
    }
  };

  return (
    <div>
      <h2>Internship Application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Internship Name</label>
          <input
            type="text"
            name="internshipName"
            value={formData.internshipName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplicationForm;