import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchCaseById, useUpdateCase } from "../../hooks/useCaseHooks";
import { NewCasePayload } from "../../types/caseTypes";

const CaseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { caseData, loading: fetchLoading, error: fetchError } = useFetchCaseById(id ? parseInt(id) : null);
  const { updateExistingCase, loading: updateLoading, error: updateError } = useUpdateCase();

  const [formData, setFormData] = useState<NewCasePayload>({
    patientId: 0,
    scribeId: undefined,
    doctorId: undefined,
    title: "",
    description: "",
    symptoms: "",
    history: "",
    statusId: 1,
  });

  useEffect(() => {
    if (caseData) {
      setFormData({
        patientId: caseData.patientId,
        scribeId: caseData.scribeId || undefined,
        doctorId: caseData.doctorId || undefined,
        title: caseData.title,
        description: caseData.description || "",
        symptoms: caseData.symptoms || "",
        history: caseData.history || "",
        statusId: caseData.statusId || 1,
      });
    }
  }, [caseData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "statusId" || name === "patientId" || name === "scribeId" || name === "doctorId"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!id) {
      alert("Case ID is missing.");
      return;
    }
  
    try {
      const caseId = parseInt(id, 10);
  
      // Ensure the payload includes the correct `id`
      const payload = {
        id: caseId, // Include the id in the payload
        patientId: formData.patientId,
        scribeId: formData.scribeId || undefined,
        doctorId: formData.doctorId || undefined,
        title: formData.title,
        description: formData.description || undefined,
        symptoms: formData.symptoms || undefined,
        history: formData.history || undefined,
        statusId: formData.statusId || 1, // Default to 1 if undefined
      };
  
      console.log("Payload being sent:", payload);
  
      const success = await updateExistingCase(caseId, payload);
      if (success) {
        alert("Case updated successfully!");
        navigate(`/cases/${id}`);
      } else {
        alert("Failed to update case.");
      }
    } catch (error) {
      console.error("Failed to update the case:", error);
    }
  };
  
  

  if (fetchLoading) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-muted">Loading Case Data...</h3>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">Failed to fetch case details. Please try again later.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0" style={{ fontFamily: "Mariupol, sans-serif" }}>
            Edit Case
          </h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="patientId" className="form-label text-primary">
                Patient ID
              </label>
              <input
                type="number"
                id="patientId"
                name="patientId"
                className="form-control"
                value={formData.patientId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="scribeId" className="form-label text-primary">
                Scribe ID
              </label>
              <input
                type="number"
                id="scribeId"
                name="scribeId"
                className="form-control"
                value={formData.scribeId || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="doctorId" className="form-label text-primary">
                Doctor ID
              </label>
              <input
                type="number"
                id="doctorId"
                name="doctorId"
                className="form-control"
                value={formData.doctorId || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="form-label text-primary">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label text-primary">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="symptoms" className="form-label text-primary">
                Symptoms
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                className="form-control"
                rows={3}
                value={formData.symptoms}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="history" className="form-label text-primary">
                History
              </label>
              <textarea
                id="history"
                name="history"
                className="form-control"
                rows={3}
                value={formData.history}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="statusId" className="form-label text-primary">
                Status ID
              </label>
              <input
                type="number"
                id="statusId"
                name="statusId"
                className="form-control"
                value={formData.statusId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary text-white" disabled={updateLoading}>
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => navigate(`/cases/${id}`)}
                disabled={updateLoading}
              >
                Cancel
              </button>
            </div>
            {updateError && <p className="text-danger text-center mt-3">{updateError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaseEdit;
