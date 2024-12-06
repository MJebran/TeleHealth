import React from "react";
import { useCaseContext } from "../../context/CaseContext";
import { Link } from "react-router-dom";

const CaseList: React.FC = () => {
  const { cases } = useCaseContext();

  console.log("Rendering cases:", cases); // Log cases during rendering

  if (cases.length === 0) {
    return <p className="text-muted">No cases available.</p>;
  }

  return (
    <div>
      <h2 className="text-primary">Cases</h2>
      <ul className="list-group">
        {cases.map((caseItem) => (
          <li key={caseItem.id} className="list-group-item">
            <Link to={`/cases/${caseItem.id}`} className="text-decoration-none">
              <strong>{caseItem.title}</strong> - {caseItem.description || "No description provided"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseList;
