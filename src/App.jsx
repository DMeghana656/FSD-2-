import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Skills from "./components/Skills";
import StudentSkills from "./components/StudentSkills";
import Internships from "./components/Internships";
import Applications from "./components/Applications";
import InternshipStatus from "./components/InternshipStatus";
import Certificates from "./components/Certificates";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [theme, setTheme] = useState("dark");
  const [applications, setApplications] = useState([]);
  const [skills, setSkills] = useState([
    "Python",
    "JavaScript",
    "React",
    "Java",
    "SQL",
  ]);

  const handleApply = (internship) => {
    const alreadyApplied = applications.some(
      (application) => application.id === internship.id
    );

    if (!alreadyApplied) {
      setApplications([
        ...applications,
        {
          ...internship,
          status: "Applied",
        },
      ]);
    }
  };
  const updateApplicationStatus = (id, newStatus) => {
    setApplications(
      applications.map((application) =>
        application.id === id
          ? { ...application, status: newStatus }
          : application
      )
    );
  };
  const renderPage = () => {
    if (activePage === "dashboard") {
      return (
        <Dashboard
          applications={applications}
          skills={skills}
        />
      );
    }

    if (activePage === "skills") {
      return (
        <Skills
          skills={skills}
          setSkills={setSkills}
        />
      );
    }
    if (activePage === "student-skills") {
      return (
        <StudentSkills
          skills={skills}
        />
      );
    }
    if (activePage === "internships") {
      return (
        <Internships
          applications={applications}
          handleApply={handleApply}
        />
      );
    }

    if (activePage === "applications") {
      return (
        <Applications
          applications={applications}
          setApplications={setApplications}
        />
      );
    }
    if (activePage === "internship-status") {
      return (
        <InternshipStatus
          applications={applications}
          updateApplicationStatus={updateApplicationStatus}
        />
      );
    }
    if (activePage === "Certificates") {
      return <Certificates />;
    }

    return <Dashboard />;
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`app-layout ${theme}-theme`}>

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <div className="logo-icon">🎓</div>

          <div>
            <h2>SkillTrack</h2>
            <span>Student Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <button
            className={
              activePage === "dashboard"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("dashboard")}
          >
            <span>📊</span>
            Dashboard
          </button>

          <button
            className={
              activePage === "skills"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("skills")}
          >
            <span>🛠️</span>
            Skills
          </button>
          <button
            className={
              activePage === "Certificates"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("Certificates")}
          >
            <span>📜</span>
            Certificates
          </button>

          <button
            className={
              activePage === "student-skills"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("student-skills")}
          >
            <span>👨‍🎓</span>
            Student Skills
          </button>


          <button
            className={
              activePage === "internships"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("internships")}
          >
            <span>💼</span>
            Internships
          </button>
          <button
            className={
              activePage === "applications"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("applications")}
          >
            <span>📄</span>
            My Applications
          </button>
          <button
            className={
              activePage === "internship-status"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("internship-status")}
          >
            <span>📌</span>
            Internship Status
          </button>

        </nav>

        <div className="sidebar-footer">
          <p>Internship & Skill</p>
          <span>Tracking Portal</span>
        </div>

      </aside>

      {/* Main Area */}
      <main className="main-content">

        <header className="top-header">

          <div className="header-title">
            <h1>Student Internship & Skill Tracking Portal</h1>
            <p>Manage students, skills and internships</p>
          </div>

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <>
                ☀️ <span>Light Mode</span>
              </>
            ) : (
              <>
                🌙 <span>Dark Mode</span>
              </>
            )}
          </button>

        </header>

        <div className="page-content">
          {renderPage()}
        </div>

      </main>

    </div>
  );
}

export default App;