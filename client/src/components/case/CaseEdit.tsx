import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCaseContext } from "../../context/CaseContext";
import { NewCasePayload } from "../../types/caseTypes";

const CaseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get case ID from URL
  const { cases, updateCaseById, refreshCases } = useCaseContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NewCasePayload>({
    patientId: 0,
    title: "",
    description: "",
    symptoms: "",
    history: "",
    statusId: undefined,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      const caseToEdit = cases.find((c) => c.id === parseInt(id || "0"));

      if (!caseToEdit) {
        await refreshCases();
      } else {
        setFormData({
          patientId: caseToEdit.patientId,
          title: caseToEdit.title,
          description: caseToEdit.description || "",
          symptoms: caseToEdit.symptoms || "",
          history: caseToEdit.history || "",
          statusId: caseToEdit.statusId || undefined,
        });
      }

      setLoading(false);
    };

    fetchCase();
  }, [id, cases, refreshCases]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCaseById(parseInt(id), formData);
        navigate(`/cases/${id}`); // Navigate back to case details
      }
    } catch (error) {
      console.error("Failed to update the case:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-muted">Loading Case Data...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Edit Case</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
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
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="symptoms" className="form-label">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            name="symptoms"
            className="form-control"
            value={formData.symptoms}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="history" className="form-label">
            History
          </label>
          <textarea
            id="history"
            name="history"
            className="form-control"
            value={formData.history}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="patientId" className="form-label">
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
          <label htmlFor="statusId" className="form-label">
            Status ID
          </label>
          <input
            type="number"
            id="statusId"
            name="statusId"
            className="form-control"
            value={formData.statusId || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate(`/cases/${id}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CaseEdit;
