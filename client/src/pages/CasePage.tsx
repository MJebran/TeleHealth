import React from "react";
import CaseList from "../components/case/CaseList";
import CaseForm from "../components/case/CaseForm";

const CasePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Manage Cases</h1>
      <div className="row">
        <div className="col-md-6">
          <CaseList />
        </div>
        <div className="col-md-6">
          <CaseForm />
        </div>
      </div>
    </div>
  );
};

export default CasePage;
