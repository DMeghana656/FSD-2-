import React, { useEffect, useState } from "react";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [certificateName, setCertificateName] = useState("");
  const [file, setFile] = useState(null);

  const fetchCertificates = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/certificates"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch certificates");
      }

      const data = await response.json();
      setCertificates(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a certificate file");
      return;
    }

    const formData = new FormData();

    formData.append("certificateName", certificateName);
    formData.append("certificate", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/certificates",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload certificate");
      }

      alert("Certificate uploaded successfully!");

      setCertificateName("");
      setFile(null);

      document.getElementById("certificateFile").value = "";

      fetchCertificates();
    } catch (error) {
      console.error(error);
      alert("Certificate upload failed");
    }
  };

  return (
    <div>
      <h1>Certificates</h1>

      <h2>Upload Certificate</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Certificate Name</label>
          <input
            type="text"
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Certificate File</label>
          <input
            id="certificateFile"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <br />

        <button type="submit">Upload Certificate</button>
      </form>

      <hr />

      <h2>Certificate List</h2>

      {certificates.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>File</th>
            </tr>
          </thead>

          <tbody>
            {certificates.map((certificate) => (
              <tr key={certificate.id}>
                <td>{certificate.certificateName}</td>
                <td>
                  {certificate.fileUrl ? (
                    <a
                      href={certificate.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Certificate
                    </a>
                  ) : (
                    "No file"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Certificates;