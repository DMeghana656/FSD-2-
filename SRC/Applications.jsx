import React, { useEffect, useState } from "react";
import ApplicationForm from "./ApplicationForm";

function Applications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/applications"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div>
      <h1>Applications</h1>

      <ApplicationForm />

      <hr />

      <h2>Application Status</h2>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Internship</th>
              <th>Company</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.internshipName}</td>
                <td>{application.companyName}</td>
                <td>{application.startDate}</td>
                <td>{application.endDate}</td>
                <td>{application.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Applications;