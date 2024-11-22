import React, { useState } from "react";
import AgreementList from "../components/agreements/AgreementList";
import AgreementForm from "../components/agreements/AgreementForm";

const AgreementsPage: React.FC = () => {
  const [editingAgreement, setEditingAgreement] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (id: number) => {
    setEditingAgreement(id);
    setShowForm(true); // Open the form modal when editing
  };

  const handleCloseForm = () => {
    setEditingAgreement(null);
    setShowForm(false); // Close the form modal
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0" style={{ backgroundColor: "#E7F6FA" }}>
        <div
          className="card-header text-white"
          style={{
            backgroundColor: "#74C0C3",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-center mb-0" style={{ fontFamily: "Mariupol, sans-serif" }}>
            Agreements
          </h2>
        </div>
        <div className="card-body" style={{ backgroundColor: "#F7F8FD" }}>
          <AgreementList onEdit={handleEdit} />
          <AgreementForm
            show={showForm} // Pass the visibility state
            agreementId={editingAgreement ?? null} // Pass the editing ID or null
            onClose={handleCloseForm}
          />
        </div>
      </div>
    </div>
  );
};

export default AgreementsPage;
