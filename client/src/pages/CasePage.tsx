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
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0" style={{ fontFamily: "Mariupol, sans-serif" }}>
            Manage Cases
          </h2>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            {/* Search by Patient Name */}
            <div className="col-md-6">
              <label htmlFor="search" className="form-label text-primary">
                Search by Patient Name
              </label>
              <input
                type="text"
                id="search"
                className="form-control"
                placeholder="Enter patient name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Create a New Case */}
            <div className="col-md-6">
              <label className="text-primary">Create a New Case</label>
              <div>
                <CaseForm />
              </div>
            </div>
          </div>
          <hr />

          <div className="row">
            {/* Case List */}
            <div className="col-md-12">
              <h5 className="text-primary">Case List</h5>
              <div className="p-2 rounded" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <CaseList cases={filteredCases} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasePage;
