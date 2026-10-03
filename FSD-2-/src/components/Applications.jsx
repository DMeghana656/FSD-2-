import "../App.css";

function Applications({ applications, setApplications }) {
  const handleWithdraw = (id) => {
    setApplications(
      applications.filter((application) => application.id !== id)
    );
  };

  return (
    <div className="applications">
      <h2>My Internship Applications</h2>

      <div className="application-list">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div className="application-card" key={application.id}>
              <h3>{application.company}</h3>

              <p>
                <strong>Role:</strong> {application.role}
              </p>

              <p>
                <strong>Domain:</strong> {application.domain}
              </p>

              <p>
                <strong>Location:</strong> {application.location}
              </p>

              <p>
                <strong>Duration:</strong> {application.duration}
              </p>

              <p>
                <strong>Status:</strong> {application.status}
              </p>

              <button
                className="withdraw-button"
                onClick={() => handleWithdraw(application.id)}
              >
                Withdraw
              </button>
            </div>
          ))
        ) : (
          <div className="no-applications">
            <h3>No Applications</h3>
            <p>You haven't applied for any internships yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;