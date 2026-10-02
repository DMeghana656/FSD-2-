import "../App.css";

function InternshipStatus({
    applications,
    updateApplicationStatus,
}) {
    return (
        <div className="internship-status">
            <h2>Internship Status</h2>

            {applications.length > 0 ? (
                <div className="status-list">
                    {applications.map((application) => (
                        <div className="status-card" key={application.id}>
                            <div>
                                <h3>{application.company}</h3>

                                <p>
                                    <strong>Role:</strong> {application.role}
                                </p>

                                <p>
                                    <strong>Domain:</strong> {application.domain}
                                </p>
                            </div>

                            <div className="status-section">
                                <span className="status-label">Current Status</span>

                                <span className="status-badge">
                                    {application.status}
                                </span>

                                <select
                                    className="status-select"
                                    value={application.status}
                                    onChange={(e) =>
                                        updateApplicationStatus(
                                            application.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Applied">Applied</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-status">
                    <h3>No internship applications</h3>
                    <p>Apply for an internship to track its status here.</p>
                </div>
            )}
        </div>
    );
}

export default InternshipStatus;