import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { User, NewUserPayload } from "../types/userTypes";

const UserPage: React.FC = () => {
  const { users, addUser } = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    password: "",
    fullName: "",
    gender: "",
    roleId: Number(null),
    isApproved: false,
    verified: false,
    hasAcceptedAgreement: false,
    agreementId: Number(null),
    role: null,
  });

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = () => setShowAddModal(true);
  const handleCloseModal = () => setShowAddModal(false);

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      toast.error("Username, Email, and Password are required!");
      return;
    }

    try {
      const payload: NewUserPayload = {
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        fullName: newUser.fullName || null,
        gender: newUser.gender || null,
        roleId: newUser.roleId || null,
        isApproved: newUser.isApproved || false,
        verified: newUser.verified || false,
        hasAcceptedAgreement: true, // Required for backend
        agreementId: newUser.agreementId || null,
      };

      await addUser(payload);
      toast.success("User added successfully!");
      handleCloseModal();
      setNewUser({
        id: 0,
        username: "",
        email: "",
        password: "",
        fullName: "",
        gender: "",
        roleId: null,
        isApproved: false,
        verified: false,
        hasAcceptedAgreement: false, // Reset for next input
        agreementId: null,
        role: null,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-center align-items-center">
          <h2 className="mb-0" style={{ fontFamily: "Mariupol, sans-serif" }}>
            Users
          </h2>
        </div>
        <div className="card-body">
          {/* Search Bar and Add User Button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <input
              type="text"
              className="form-control me-2"
              style={{ flex: "1" }}
              placeholder="Search users by username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="primary"
              className="text-white "
              onClick={handleShowModal}
            >
              Add User
            </Button>
          </div>

          <div className="row">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch"
                >
                  <Link
                    to={`/users/${user.id}`}
                    className="card border-primary w-100 text-decoration-none text-dark"
                    style={{
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-primary fw-bold">
                        {user.username}
                      </h5>
                      <p className="card-text mb-1">
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p className="card-text">
                        <strong>Role:</strong> {user.role?.roleName ?? "N/A"}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center">No users found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={newUser.fullName}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, fullName: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={newUser.gender || ""}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="role" className="mb-3">
              <Form.Label>Role ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter role ID"
                value={newUser.roleId || ""}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    roleId: Number(e.target.value),
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserPage;

