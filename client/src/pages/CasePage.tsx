import React, { useState } from "react";
import CaseList from "../components/case/CaseList";
import CaseForm from "../components/case/CaseForm";
import { useCaseContext } from "../context/CaseContext";
import { useUserContext } from "../context/UserContext";

const CasePage: React.FC = () => {
  const { cases } = useCaseContext();
  const { users } = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter cases based on patient name
  const filteredCases = cases.filter((caseItem) => {
    const patient = users.find((user) => user.id === caseItem.patientId);
    return (
      patient?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
    );
  });

  return (
    <div className="container mt-5">
      <h1 className="text-primary">Manage Cases</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by patient name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <CaseList cases={filteredCases} />
        </div>
        <div className="col-md-6">
          <CaseForm />
        </div>
      </div>
    </div>
  );
};

export default CasePage;
