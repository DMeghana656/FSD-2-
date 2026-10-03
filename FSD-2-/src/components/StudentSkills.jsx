import { useState } from "react";
import "../App.css";

function StudentSkills({ skills }) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const [students] = useState([
    "Student 1",
    "Student 2",
    "Student 3",
  ]);



  const [assignedSkills, setAssignedSkills] = useState([]);

  const handleAssignSkill = () => {
    if (selectedStudent === "" || selectedSkill === "") {
      alert("Please select both a student and a skill.");
      return;
    }

    const alreadyAssigned = assignedSkills.some(
      (item) =>
        item.student === selectedStudent &&
        item.skill === selectedSkill
    );

    if (alreadyAssigned) {
      alert("This skill is already assigned to this student.");
      return;
    }

    const newAssignment = {
      student: selectedStudent,
      skill: selectedSkill,
    };

    setAssignedSkills([...assignedSkills, newAssignment]);

    setSelectedStudent("");
    setSelectedSkill("");
  };

  return (
    <div className="student-skills-page">

      {/* Header */}
      <div className="student-skills-header">

        <div>
          <h2>Student Skills</h2>
          <p>
            Assign and manage technical skills for students
          </p>
        </div>

        <div className="assignment-count">
          <span>{assignedSkills.length}</span>
          <small>Total Assignments</small>
        </div>

      </div>


      {/* Assignment Card */}
      <div className="assignment-card">

        <div className="section-title">

          <div className="section-icon">
            🎓
          </div>

          <div>
            <h3>Assign Skill to Student</h3>
            <p>
              Select a student and assign a technical skill
            </p>
          </div>

        </div>


        <div className="assignment-form">

          <div className="form-group">

            <label>Student</label>

            <select
              value={selectedStudent}
              onChange={(e) =>
                setSelectedStudent(e.target.value)
              }
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student}
                  value={student}
                >
                  {student}
                </option>
              ))}
            </select>

          </div>


          <div className="form-group">

            <label>Skill</label>

            <select
              value={selectedSkill}
              onChange={(e) =>
                setSelectedSkill(e.target.value)
              }
            >
              <option value="">
                Select Skill
              </option>

              {skills.map((skill) => (
                <option
                  key={skill}
                  value={skill}
                >
                  {skill}
                </option>
              ))}
            </select>

          </div>


          <button
            className="assign-button"
            onClick={handleAssignSkill}
          >
            Assign Skill
          </button>

        </div>

      </div>


      {/* Assigned Skills */}
      <div className="assigned-skills-card">

        <div className="assigned-header">

          <div>
            <h3>Assigned Skills</h3>
            <p>
              Skills currently assigned to students
            </p>
          </div>

        </div>


        {assignedSkills.length === 0 ? (

          <div className="no-assignments">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No skills assigned yet
            </h3>

            <p>
              Select a student and skill above to
              create an assignment.
            </p>

          </div>

        ) : (

          <div className="assignments-list">

            {assignedSkills.map((item, index) => (

              <div
                className="assignment-row"
                key={index}
              >

                <div className="student-info">

                  <div className="student-avatar">
                    {item.student.charAt(
                      item.student.length - 1
                    )}
                  </div>

                  <div>
                    <h4>
                      {item.student}
                    </h4>

                    <span>
                      Student
                    </span>
                  </div>

                </div>


                <div className="assignment-arrow">
                  →
                </div>


                <div className="assigned-skill">

                  <span className="skill-badge">
                    {item.skill}
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

export default StudentSkills;