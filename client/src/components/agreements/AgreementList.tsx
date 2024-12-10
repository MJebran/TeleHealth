import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAgreements } from "../../hooks/useAgreements";
import toast, { Toaster } from "react-hot-toast";

interface AgreementListProps {
  onEdit: (id: number, version: string, agreementText: string) => void;
}

const AgreementList: React.FC<AgreementListProps> = ({ onEdit }) => {
  const { agreements, removeAgreement, loading, error, addNewAgreement } =
    useAgreements();

  const [selectedAgreement, setSelectedAgreement] = useState<{
    id: number;
    version: string;
    agreementText: string;
  } | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAgreement, setNewAgreement] = useState({
    version: "",
    agreementText: "",
  });

  const handleViewDetails = (agreement: {
    id: number;
    version: string;
    agreementText: string;
  }) => {
    setSelectedAgreement(agreement);
  };

  const handleCloseDetailsModal = () => {
    setSelectedAgreement(null);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewAgreement({ version: "", agreementText: "" });
  };

  const handleAddAgreement = async () => {
    if (newAgreement.version && newAgreement.agreementText) {
      try {
        await addNewAgreement(newAgreement);
        toast.success("Agreement added successfully!");
        handleCloseAddModal();
      } catch {
        toast.error("Failed to add agreement. Please try again.");
      }
    }
  };

  const handleDeleteAgreement = async (id: number) => {
    try {
      await removeAgreement(id);
      toast.success("Agreement deleted successfully!");
    } catch {
      toast.error("Failed to delete agreement. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container-sm py-3">
      {/* Hot Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <h5 className="mb-4 text-start">Agreements List</h5>
      <ul className="list-group mb-4">
        {agreements.map((agreement) => (
          <li
            key={agreement.id}
            className="list-group-item mb-1 rounded cursor-pointer"
            onClick={() => handleViewDetails(agreement)} // Open modal with details
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">{agreement.version}</span>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  style={{ width: "80px" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the agreement click
                    onEdit(
                      agreement.id,
                      agreement.version,
                      agreement.agreementText
                    ); // Pass agreement details to edit
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  style={{ width: "80px" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the agreement click
                    handleDeleteAgreement(agreement.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-center">
        <button
          className="btn btn-primary text-white"
          onClick={handleShowAddModal}
        >
          Add Agreement
        </button>
      </div>

      {/* Modal for Agreement Details */}
      {selectedAgreement && (
        <Modal
          show={true}
          onHide={handleCloseDetailsModal}
          centered
          className="modal-dialog-scrollable"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-truncate">
              {selectedAgreement.version}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-wrap">{selectedAgreement.agreementText}</p>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button
                variant="outline-primary"
                onClick={() => {
                  onEdit(
                    selectedAgreement.id,
                    selectedAgreement.version,
                    selectedAgreement.agreementText
                  );
                  handleCloseDetailsModal();
                }}
                style={{ width: "80px" }}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  handleDeleteAgreement(selectedAgreement.id);
                  handleCloseDetailsModal();
                }}
                style={{ width: "80px" }}
              >
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal for Adding Agreement */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Agreement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAgreementVersion" className="mb-3">
              <Form.Label>Version</Form.Label>
              <Form.Control
                type="text"
                value={newAgreement.version}
                onChange={(e) =>
                  setNewAgreement((prev) => ({
                    ...prev,
                    version: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formAgreementText" className="mb-3">
              <Form.Label>Agreement Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newAgreement.agreementText}
                onChange={(e) =>
                  setNewAgreement((prev) => ({
                    ...prev,
                    agreementText: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="text-white"
            onClick={handleAddAgreement}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AgreementList;
