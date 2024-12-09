import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useFetchCaseById, useDeleteCase } from "../../hooks/useCaseHooks"; // Import hooks
import { useCaseContext } from "../../context/CaseContext"; // For refreshing cases

const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { users } = useUserContext();
  const { refreshCases } = useCaseContext(); // Refresh case list
  const { caseData: caseDetail, loading, error } = useFetchCaseById(
    id ? parseInt(id) : null
  );
  const { deleteExistingCase, loading: deleteLoading, error: deleteError } = useDeleteCase();
  const navigate = useNavigate();

  const getUserName = (userId: number | null | undefined) => {
    if (!userId) return "Not assigned";
    const user = users.find((user) => user.id === userId);
    return user ? user.fullName || user.username : "Unknown User";
  };

  const handleDelete = async () => {
    if (id && window.confirm("Are you sure you want to delete this case?")) {
      const success = await deleteExistingCase(parseInt(id));
      if (success) {
        alert("Case deleted successfully!");
        await refreshCases(); // Refresh the case list
        navigate("/cases"); // Redirect to case list after deletion
      } else {
        alert("Failed to delete case. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-muted">Loading Case Details...</h3>
      </div>
    );
  }

  if (error || !caseDetail) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">Error loading case details.</h3>
        <p>{error || "The case could not be found."}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3
            className="mb-0 text-center"
            style={{ fontFamily: "Mariupol, sans-serif" }}
          >
            Case Details
          </h3>
        </div>
        <div className="card-body">
          {/* Title */}
          <div className="row mb-2">
            <div className="col-12">
              <h5 className="text-primary">Title</h5>
              <p>{caseDetail.title}</p>
              <hr />
            </div>
          </div>

          {/* Description */}
          <div className="row mb-2">
            <div className="col-12">
              <h5 className="text-primary">Description</h5>
              <p>{caseDetail.description || "No description provided"}</p>
              <hr />
            </div>
          </div>

          {/* Symptoms */}
          <div className="row mb-2">
            <div className="col-12">
              <h5 className="text-primary">Symptoms</h5>
              <p>{caseDetail.symptoms || "No symptoms provided"}</p>
              <hr />
            </div>
          </div>

          {/* History */}
          <div className="row mb-2">
            <div className="col-12">
              <h5 className="text-primary">History</h5>
              <p>{caseDetail.history || "No history provided"}</p>
              <hr />
            </div>
          </div>

          {/* Patient, Scribe, and Doctor */}
          <div className="row mb-2">
            <div className="col-md-2">
              <h5 className="text-primary">Patient</h5>
              <p>{getUserName(caseDetail.patientId)}</p>
            </div>
            <div className="col-md-2">
              <h5 className="text-primary">Scribe</h5>
              <p>{getUserName(caseDetail.scribeId)}</p>
            </div>
            <div className="col-md-2">
              <h5 className="text-primary">Doctor</h5>
              <p>{getUserName(caseDetail.doctorId)}</p>
            </div>
            <div className="col-md-2">
              <h5 className="text-primary">Status ID</h5>
              <p>{caseDetail.statusId || "Unknown"}</p>
            </div>
            <div className="col-md-2">
              <h5 className="text-primary">Created At</h5>
              <p>
                {caseDetail.createdAt
                  ? new Date(caseDetail.createdAt).toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          </div>
        </div>

        <div className="card-footer text-center">
          <Link to="/cases" className="btn btn-secondary me-2">
            Back to Cases
          </Link>
          <Link to={`/cases/edit/${caseDetail.id}`} className="btn btn-primary text-light">
            Edit Case
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger ms-2"
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete Case"}
          </button>
          {deleteError && <p className="text-danger mt-2">{deleteError}</p>}
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
