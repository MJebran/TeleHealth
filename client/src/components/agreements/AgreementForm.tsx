import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useAgreements } from "../../hooks/useAgreements";

interface AgreementFormProps {
  agreementId?: number | null;
  show: boolean;
  onClose: () => void;
}

const AgreementForm: React.FC<AgreementFormProps> = ({
  agreementId,
  show,
  onClose,
}) => {
  const { addNewAgreement, updateAgreement, agreements } = useAgreements();
  const [version, setVersion] = useState("");
  const [agreementText, setAgreementText] = useState("");

  useEffect(() => {
    if (agreementId) {
      const agreement = agreements.find((a) => a.id === agreementId);
      if (agreement) {
        setVersion(agreement.version);
        setAgreementText(agreement.agreementText);
      }
    } else {
      setVersion("");
      setAgreementText("");
    }
  }, [agreementId, agreements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (agreementId) {
      await updateAgreement(agreementId, { version, agreementText });
    } else {
      await addNewAgreement({ version, agreementText });
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {agreementId ? "Edit Agreement" : "Add New Agreement"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="version" className="form-label">
              Version
            </label>
            <input
              type="text"
              id="version"
              className="form-control"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="agreementText" className="form-label">
              Agreement Text
            </label>
            <textarea
              id="agreementText"
              className="form-control"
              rows={3}
              value={agreementText}
              onChange={(e) => setAgreementText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              {agreementId ? "Update" : "Add"} Agreement
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AgreementForm;
