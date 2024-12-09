import React, { useState } from "react";
import { useCreateCase } from "../../hooks/useCaseHooks";
import { NewCasePayload } from "../../types/caseTypes";

const CaseForm: React.FC = () => {
  const { createNewCase, loading, error } = useCreateCase();

  const [patientName, setPatientName] = useState(""); // Added patient name
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [history, setHistory] = useState("");
  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setPatientName("");
    setTitle("");
    setDescription("");
    setSymptoms("");
    setHistory("");
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      alert("Please enter a valid patient name.");
      return;
    }

    // Prepare payload with fixed IDs and patientName
    const newCasePayload: NewCasePayload = {
      patientId: 2, // Fixed patient ID as per your database
      doctorId: 1,  // Fixed doctor ID as per your database
      scribeId: 4,  // Fixed scribe ID as per your database
      title,
      description: description || undefined,
      symptoms: symptoms || undefined,
      history: history || undefined,
      statusId: 1, // Default status
    };

    try {
      const createdCase = await createNewCase(newCasePayload);

      if (createdCase) {
        alert(`Case created successfully for ${patientName}!`);
        resetForm();
      } else {
        alert("Failed to create case. Please try again.");
      }
    } catch (err) {
      console.error("Error creating case:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <button className="btn btn-primary mt-2 text-white" onClick={() => setShowModal(true)}>
        Create Case
      </button>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Case</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={resetForm}
                ></button>
              </div>
              <div className="modal-body">
                {loading && <p className="text-muted">Creating case...</p>}
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="patientName" className="form-label">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      className="form-control"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="symptoms" className="form-label">
                      Symptoms
                    </label>
                    <textarea
                      id="symptoms"
                      className="form-control"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="history" className="form-label">
                      History
                    </label>
                    <textarea
                      id="history"
                      className="form-control"
                      value={history}
                      onChange={(e) => setHistory(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary text-white" disabled={loading}>
                    Create Case
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseForm;
