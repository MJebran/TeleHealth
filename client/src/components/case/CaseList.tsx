import React from "react";
import { Link } from "react-router-dom";
import { useCaseContext } from "../../context/CaseContext";
import { useUserContext } from "../../context/UserContext";

const CaseList: React.FC = () => {
  const { cases } = useCaseContext(); // Fetch cases from the CaseContext
  const { users } = useUserContext(); // Fetch users from the UserContext

  return (
    <div>
      {cases.length === 0 ? (
        <p className="text-muted">No cases available.</p>
      ) : (
        <ul className="list-group">
          {cases.map((caseItem) => {
            // Find the patient associated with this case
            const patient = users.find((user) => user.id === caseItem.patientId);

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
