import { useState } from "react";
import "../App.css";

function Internships({ applications, handleApply }) {
    const [selectedDomain, setSelectedDomain] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const internships = [
        {
            id: 1,
            company: "Google",
            role: "Software Development Intern",
            domain: "Software Development",
            location: "Bangalore",
            duration: "3 Months",
        },
        {
            id: 2,
            company: "Microsoft",
            role: "Frontend Development Intern",
            domain: "Web Development",
            location: "Hyderabad",
            duration: "2 Months",
        },
        {
            id: 3,
            company: "TCS",
            role: "Python Developer Intern",
            domain: "Python",
            location: "Chennai",
            duration: "3 Months",
        },
        {
            id: 4,
            company: "Infosys",
            role: "Data Analytics Intern",
            domain: "Data Analytics",
            location: "Pune",
            duration: "2 Months",
        },
    ];

    const filteredInternships = internships.filter((internship) => {
        const matchesDomain =
            selectedDomain === "All" ||
            internship.domain === selectedDomain;

        const matchesSearch =
            internship.company
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            internship.role
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return matchesDomain && matchesSearch;
    });

    return (
        <div className="internships">
            <h2>Internship Opportunities</h2>

            <div className="internship-filter">
                <input
                    type="text"
                    placeholder="Search company or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="internship-search"
                />

                <label>Filter by Domain:</label>

                <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                >
                    <option value="All">All Domains</option>
                    <option value="Software Development">
                        Software Development
                    </option>
                    <option value="Web Development">
                        Web Development
                    </option>
                    <option value="Python">Python</option>
                    <option value="Data Analytics">
                        Data Analytics
                    </option>
                </select>
                <button
                    onClick={() => {
                        setSelectedDomain("All");
                        setSearchTerm("");
                    }}
                >
                    Clear Filters
                </button>
            </div>

            <div className="internship-list">
                {filteredInternships.length > 0 ? (
                    filteredInternships.map((internship) => {
                        const isApplied = applications.some(
                            (application) => application.id === internship.id
                        );

                        return (
                            <div className="internship-card" key={internship.id}>
                                <h3>{internship.company}</h3>

                                <p>
                                    <strong>Role:</strong> {internship.role}
                                </p>

                                <p>
                                    <strong>Domain:</strong> {internship.domain}
                                </p>

                                <p>
                                    <strong>Location:</strong> {internship.location}
                                </p>

                                <p>
                                    <strong>Duration:</strong> {internship.duration}
                                </p>

                                <button
                                    onClick={() => handleApply(internship)}
                                    className={isApplied ? "applied-button" : ""}
                                    disabled={isApplied}
                                >
                                    {isApplied ? "✓ Applied" : "Apply"}
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-internships">
                        <h3>No internships found</h3>
                        <p>Try a different company, role, or domain.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Internships;