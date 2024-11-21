import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useRoles } from "../../hooks/useRoles";
import toast, { Toaster } from "react-hot-toast";

const RoleList: React.FC = () => {
  const { roles, addNewRole, removeRole, loading, error } = useRoles();

  // Modal state for role details and editing
  const [selectedRole, setSelectedRole] = useState<{
    id: number;
    roleName: string;
  } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");

  // Handlers
  const handleViewDetails = (role: { id: number; roleName: string }) => {
    setSelectedRole(role);
  };

  const handleCloseDetailsModal = () => {
    setSelectedRole(null);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewRoleName("");
  };

  const handleAddRole = async () => {
    if (!newRoleName.trim()) {
      toast.error("Role name cannot be empty!");
      return;
    }
    await addNewRole(newRoleName);
    setNewRoleName("");
    handleCloseAddModal();
    toast.success("Role added successfully!");
  };

  const handleEditRole = async () => {
    if (selectedRole && selectedRole.roleName.trim()) {
      try {
        const response = await fetch(
          `http://localhost:5071/api/Role/${selectedRole.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedRole),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update role");
        }

        toast.success("Role updated successfully!");
        handleCloseDetailsModal();
      } catch (error) {
        toast.error("Failed to update role");
        console.error(error);
      }
    } else {
      toast.error("Role name cannot be empty!");
    }
  };

  const handleDeleteRole = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await removeRole(id);
      toast.success("Role deleted successfully!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container-sm py-3">
      <Toaster position="top-center" />
      <h5 className="mb-4 text-start">Roles List</h5>
      <ul className="list-group mb-4">
        {roles.map((role) => (
          <li
            key={role.id}
            className="list-group-item mb-2"
            style={{
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleViewDetails(role)} // Open modal with details
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">{role.roleName}</span>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  style={{ width: "80px" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the role click
                    handleViewDetails(role); // Open edit modal
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  style={{ width: "80px" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the role click
                    handleDeleteRole(role.id); // Delete role
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
          className="btn btn-primary w-100"
          style={{
            maxWidth: "300px",
            borderRadius: "8px",
          }}
          onClick={handleShowAddModal}
        >
          Add Role
        </button>
      </div>

      {/* Modal for Role Details/Edit */}
      {selectedRole && (
        <Modal
          show={true}
          onHide={handleCloseDetailsModal}
          centered
          className="modal-dialog-scrollable"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-truncate">Edit Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formRoleName">
                <Form.Label>Role Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRole.roleName}
                  onChange={(e) =>
                    setSelectedRole((prev) => ({
                      ...prev!,
                      roleName: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailsModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditRole}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal for Adding Role */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewRoleName">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddRole}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleList;
