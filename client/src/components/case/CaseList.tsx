import React from "react";
import { Link } from "react-router-dom";
import { Case } from "../../types/caseTypes";
import { useUserContext } from "../../context/UserContext";

interface CaseListProps {
  filteredCases: Case[];
}

const CaseList: React.FC<CaseListProps> = ({ filteredCases }) => {
  const { users } = useUserContext();

  return (
    <div>
      {filteredCases.length === 0 ? (
        <p className="text-muted">No cases available.</p>
      ) : (
        <ul className="list-group">
          {filteredCases.map((caseItem) => {
            // Ensure caseItem is explicitly typed
            const patient = users.find(
              (user) => user.id === caseItem.patientId
            );

            return (
              <li key={caseItem.id} className="list-group-item">
                <Link to={`/cases/${caseItem.id}`}>
                  <strong>{caseItem.title}</strong> -{" "}
                  {patient?.fullName || "Unknown Patient"}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CaseList;