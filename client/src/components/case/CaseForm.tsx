import React, { useState } from "react";
import { useCreateCase } from "../../hooks/useCaseHooks";
import { useUserContext } from "../../context/UserContext";
import { NewCasePayload } from "../../types/caseTypes";
import { NewUserPayload } from "../../types/userTypes"; // Import user types

const CaseForm: React.FC = () => {
  const { createNewCase, loading: caseLoading, error: caseError } = useCreateCase();
  const { addUser } = useUserContext(); // Add user function from UserContext

  const [isExistingPatient, setIsExistingPatient] = useState(true);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientEmail, setNewPatientEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [history, setHistory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [creatingPatient, setCreatingPatient] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSymptoms("");
    setHistory("");
    setPatientId(null);
    setNewPatientName("");
    setNewPatientEmail("");
    setShowModal(false);
  };

  const handleCreatePatient = async (): Promise<number | null> => {
    try {
      setCreatingPatient(true);
      const newUserPayload: NewUserPayload = {
        username: newPatientEmail,
        email: newPatientEmail,
        fullName: newPatientName,
        password: "temporaryPassword", // Backend might need a password
        hasAcceptedAgreement: true, // Required by backend
        roleId: null, // Default role for patients
      };
  
      const newUser = await addUser(newUserPayload); // Handle the response
      return newUser ? newUser.id : null; // Ensure it returns the user's ID
    } catch (error) {
      console.error("Failed to create patient:", error);
      alert("Failed to create patient. Please try again.");
      return null;
    } finally {
      setCreatingPatient(false);
    }
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let selectedPatientId = patientId;

    if (!isExistingPatient) {
      if (!newPatientName.trim() || !newPatientEmail.trim()) {
        alert("Please enter a valid name and email for the new patient.");
        return;
      }

      const newPatientId = await handleCreatePatient();
      if (!newPatientId) return; // Stop submission if patient creation fails
      selectedPatientId = newPatientId;
    }

    const newCasePayload: NewCasePayload = {
      patientId: selectedPatientId!, // Use the selected or newly created patient ID
      doctorId: 1, // Fixed doctor ID
      scribeId: 4, // Fixed scribe ID
      title,
      description: description || undefined,
      symptoms: symptoms || undefined,
      history: history || undefined,
      statusId: 1, // Default status
    };

    try {
      const createdCase = await createNewCase(newCasePayload);

      if (createdCase) {
        alert("Case created successfully!");
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
                {(caseLoading || creatingPatient) && <p className="text-muted">Processing...</p>}
                {caseError && <p className="text-danger">{caseError}</p>}
                <form onSubmit={handleSubmit}>
                  {/* Toggle for Existing or New Patient */}
                  <div className="mb-3">
                    <label className="form-label">Patient Type</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="existingPatient"
                        name="patientType"
                        checked={isExistingPatient}
                        onChange={() => setIsExistingPatient(true)}
                      />
                      <label className="form-check-label" htmlFor="existingPatient">
                        Existing Patient
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="newPatient"
                        name="patientType"
                        checked={!isExistingPatient}
                        onChange={() => setIsExistingPatient(false)}
                      />
                      <label className="form-check-label" htmlFor="newPatient">
                        New Patient
                      </label>
                    </div>
                  </div>

                  {/* Existing Patient Dropdown */}
                  {isExistingPatient ? (
                    <div className="mb-3">
                      <label htmlFor="patient" className="form-label">
                        Select Existing Patient
                      </label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search patient name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <select
                        id="patient"
                        className="form-select"
                        value={patientId || ""}
                        onChange={(e) => setPatientId(Number(e.target.value))}
                      >
                        <option value="">-- Select Patient --</option>
                        {/* Fetch existing users dynamically */}
                      </select>
                    </div>
                  ) : (
                    // New Patient Fields
                    <>
                      <div className="mb-3">
                        <label htmlFor="newPatientName" className="form-label">
                          New Patient Name
                        </label>
                        <input
                          type="text"
                          id="newPatientName"
                          className="form-control"
                          value={newPatientName}
                          onChange={(e) => setNewPatientName(e.target.value)}
                          placeholder="Enter new patient name"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="newPatientEmail" className="form-label">
                          New Patient Email
                        </label>
                        <input
                          type="email"
                          id="newPatientEmail"
                          className="form-control"
                          value={newPatientEmail}
                          onChange={(e) => setNewPatientEmail(e.target.value)}
                          placeholder="Enter new patient email"
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Case Details */}
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

                  <button type="submit" className="btn btn-primary text-white" disabled={caseLoading || creatingPatient}>
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
