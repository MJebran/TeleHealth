import React, { useState } from "react";
import { useCaseContext } from "../../context/CaseContext";
import { useUserContext } from "../../context/UserContext";
import { NewCasePayload } from "../../types/caseTypes";

const CaseForm: React.FC = () => {
  const { addCase } = useCaseContext();
  const { users } = useUserContext();

  const [isExistingPatient, setIsExistingPatient] = useState(true);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [newPatientName, setNewPatientName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [history, setHistory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isExistingPatient && !patientId) {
      alert("Please select an existing patient.");
      return;
    }

    if (!isExistingPatient && !newPatientName.trim()) {
      alert("Please enter the new patient's name.");
      return;
    }

    const newCase: NewCasePayload = {
      patientId: isExistingPatient ? patientId! : 0,
      title,
      description,
      symptoms,
      history,
    };

    try {
      await addCase(newCase);
      setTitle("");
      setDescription("");
      setSymptoms("");
      setHistory("");
      setPatientId(null);
      setNewPatientName("");
      alert("Case created successfully!");
      setShowModal(false); // Close the modal on success
    } catch (error) {
      console.error("Error creating case:", error);
      alert("Failed to create case.");
    }
  };

  return (
    <div>
      {/* Button to Trigger Modal */}
      <button className="btn btn-primary mt-2 text-white" onClick={() => setShowModal(true)}>
        Create Case
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Case</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
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
                        Search Patient
                      </label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search by name"
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
                        {users
                          .filter((user) =>
                            user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.fullName || user.username}
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : (
                    // New Patient Input
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
                      />
                    </div>
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

                  <button type="submit" className="btn btn-primary text-white">
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
