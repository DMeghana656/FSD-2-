import { useState } from "react";
import "../App.css";

function Certificates() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [certificates, setCertificates] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setMessage("");
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setMessage("Please select a certificate first.");
            return;
        }

        const newCertificate = {
            id: Date.now(),
            name: "Internship Certificate",
            fileName: selectedFile.name,
            type: "Internship",
            status: "Completed",
            date: new Date().toLocaleDateString(),
            file: selectedFile,
        };

        setCertificates([...certificates, newCertificate]);
        setMessage("Certificate uploaded successfully!");
    };

    return (
        <div className="certificate-page">
            <h2>Certificates</h2>
            <p>Upload and manage your internship certificates.</p>

            <div className="certificate-card">
                <h3>Upload Certificate</h3>

                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                />

                <button onClick={handleUpload}>
                    Upload Certificate
                </button>

                {message && (
                    <p className="upload-message">{message}</p>
                )}

                {certificates.length === 0 && (
                    <div className="no-certificates">
                        <p>No certificates uploaded yet.</p>
                    </div>
                )}
                {certificates.length > 0 && (
                    <div className="certificate-list">
                        <div className="certificate-list-headerF">
                            <h3>My Certificates</h3>
                            <span>{certificates.length} Certificate(s)</span>
                        </div>

                        {certificates.map((certificate) => (
                            <div className="certificate-info" key={certificate.id}>
                                <h3>{certificate.name}</h3>

                                <p>
                                    <strong>File Name:</strong> {certificate.fileName}
                                </p>

                                <p>
                                    <strong>Status:</strong> {certificate.status}
                                </p>

                                <p>
                                    <strong>Type:</strong> {certificate.type}
                                </p>
                                <p>
                                    <strong>Uploaded Date:</strong> {certificate.date}
                                </p>

                                <div className="certificate-actions">
                                    <button
                                        onClick={() =>
                                            window.open(URL.createObjectURL(certificate.file), "_blank")
                                        }
                                    >
                                        View Certificate
                                    </button>

                                    <button
                                        className="delete-certificate-btn"
                                        onClick={() => {
                                            const confirmDelete = window.confirm(
                                                "Are you sure you want to delete this certificate?"
                                            );

                                            if (confirmDelete) {
                                                setCertificates(
                                                    certificates.filter((item) => item.id !== certificate.id)
                                                );
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Certificates;