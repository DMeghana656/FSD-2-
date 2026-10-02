import { useState } from "react";
import "../App.css";

function Skills({ skills, setSkills }) {
  const [skillName, setSkillName] = useState("");

 
  const handleAddSkill = () => {
    const trimmedSkill = skillName.trim();

    if (trimmedSkill === "") {
      alert("Please enter a skill name.");
      return;
    }

    if (skills.includes(trimmedSkill)) {
      alert("This skill already exists.");
      return;
    }

    setSkills([...skills, trimmedSkill]);
    setSkillName("");
  };

  return (
    <div className="skills-page">

      {/* Header */}
      <div className="skills-header">

        <div>
          <h2>Skills</h2>
          <p>Manage and track technical skills</p>
        </div>

        <div className="skills-count">
          <span>{skills.length}</span>
          <small>Available Skills</small>
        </div>

      </div>


      {/* Add Skill Section */}
      <div className="add-skill-card">

        <div className="section-title">

          <div className="section-icon">
            ＋
          </div>

          <div>
            <h3>Add New Skill</h3>
            <p>
              Add a technical skill to the portal
            </p>
          </div>

        </div>


        <div className="skill-input-area">

          <input
            type="text"
            placeholder="Enter skill name"
            value={skillName}
            onChange={(e) =>
              setSkillName(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddSkill();
              }
            }}
          />

          <button onClick={handleAddSkill}>
            Add Skill
          </button>

        </div>

      </div>


      {/* Available Skills */}
      <div className="available-skills-section">

        <div className="available-skills-header">

          <div>
            <h3>Available Skills</h3>
            <p>
              Technical skills currently available
              in the portal
            </p>
          </div>

        </div>


        {skills.length === 0 ? (

          <div className="no-skills">

            <div className="no-skills-icon">
              🛠️
            </div>

            <h3>
              No skills available
            </h3>

            <p>
              Add your first technical skill above.
            </p>

          </div>

        ) : (

          <div className="skills-grid">

            {skills.map((skill, index) => (

              <div
                className="skill-card"
                key={index}
              >

                <div className="skill-icon">
                  💡
                </div>

                <div className="skill-info">

                  <h4>{skill}</h4>

                  <span>
                    Technical Skill
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Skills;