import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useUsers } from "../../hooks/useUsers";
import { User } from "../../types/userTypes";
import toast, { Toaster } from "react-hot-toast";

const UserList: React.FC = () => {
  const { users, loading, error, removeUser, editUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await removeUser(id);
      toast.success("User deleted successfully!");
    }
  };

  const handleSave = async () => {
    if (selectedUser) {
      await editUser(selectedUser.id, selectedUser);
      setSelectedUser(null);
      toast.success("User updated successfully!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <Toaster />
      <div className="card shadow-lg border-0 bg-light">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0">User List</h2>
        </div>
        <div className="card-body bg-white">
          <ul className="list-group">
            {users.map((user) => (
              <li
                key={user.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ borderRadius: "5px", marginBottom: "10px" }}
              >
                <span>{user.username}</span>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary mx-1"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedUser && (
        <Modal show onHide={() => setSelectedUser(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.username}
                  onChange={(e) =>
                    setSelectedUser((prev) => ({
                      ...prev!,
                      username: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser((prev) => ({
                      ...prev!,
                      email: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedUser(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
