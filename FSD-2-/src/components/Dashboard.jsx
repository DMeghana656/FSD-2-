import "../App.css";
function Dashboard({ applications, skills }) {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p>Student Internship & Skill Tracking Portal</p>
        </div>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">👨‍🎓</div>
          <div className="card-content">
            <h3>Total Students</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🏢</div>
          <div className="card-content">
            <h3>Total Companies</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💼</div>
          <div className="card-content">
            <h3>Total Internships</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📋</div>
          <div className="card-content">
            <h3>Total Applications</h3>
            <p>{applications.length}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📜</div>
          <div className="card-content">
            <h3>Total Certificates</h3>
            <p>0</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🛠️</div>
          <div className="card-content">
            <h3>Total Skills</h3>
            <p>{skills.length}</p>
          </div>
        </div>

      </div>

      <div className="dashboard-welcome">
        <div>
          <h3>Welcome to the Skill Tracking Portal 👋</h3>
          <p>
            Track student skills, internships, applications and certificates
            from one place.
          </p>
        </div>

        
      </div>
    </div>
  );
}

export default Dashboard;